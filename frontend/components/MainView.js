import React from "react";
import UploadModal from "./UploadModal";
import Video from "./Video";
import BottomBar from "./BottomBar";
import styles from "../styles/MainView.module.css";
import Signup from "./Signup";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { SOLANA_HOST } from "../utils/const";
import { getProgramInstance } from "../utils/utils";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

import { useAccount } from "../hooks/useAccount";
import { useTicktock } from "../hooks/useTicktock";

const anchor = require("@project-serum/anchor");
const utf8 = anchor.utils.bytes.utf8;
const { BN, web3 } = anchor;
const { SystemProgram } = anchor;
const defaultAccounts = {
  tokenProgram: TOKEN_PROGRAM_ID,
  clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
  systemProgram: SystemProgram?.programId,
};
const MainView = () => {
  const [isAccount, setAccount] = useState(false);
  const wallet = useWallet();
  const connection = new anchor.web3.Connection(SOLANA_HOST);

  const program = getProgramInstance(connection, wallet);

  const [ticktocks, setTickTocks] = useState();
  const [newVideoShow, setNewVideoShow] = useState(false);
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [userDetail, setUserDetail] = useState();

  const { signup } = useAccount();
  const { getTicktocks, likeVideo, createComment, newVideo, getComments } =
    useTicktock(
      setTickTocks,
      userDetail,
      videoUrl,
      description,
      setDescription,
      setVideoUrl,
      setNewVideoShow
    );

  useEffect(() => {
    if (wallet.connected) {
      checkAccount();
      getTicktocks();
    }
  }, [wallet.connected]);

  const checkAccount = async () => {
    let [user_pda] = await anchor.web3.PublicKey.findProgramAddressSync(
      [utf8.encode("user"), wallet.publicKey.toBuffer()],
      program.programId
    );
    try {
      const userInfo = await program.account.userAccount.fetch(user_pda);
      console.log(userInfo);
      setUserDetail(userInfo);
      setAccount(true);
    } catch (e) {
      setAccount(false);
    }
  };

  return (
    <>
      {isAccount ? (
        <div>
          {newVideoShow && (
            <UploadModal
              description={description}
              videoUrl={videoUrl}
              newVideo={newVideo}
              setDescription={setDescription}
              setVideoUrl={setVideoUrl}
              setNewVideoShow={setNewVideoShow}
            />
          )}
          <div classNmae={styles.appVideos}>
            {ticktocks.length === 0 ? (
              <h1>No Videos</h1>
            ) : (
              ticktocks.map((ticktock, id) => {
                <Video
                  key={id}
                  address={ticktock.publicKey.toBase58()}
                  url={ticktock.account.videoUrl}
                  channel={ticktock.account.creatorName}
                  index={ticktock.account.index.toNumber()}
                  likes={ticktock.likes}
                  description={ticktock.account.description}
                  likeVideo={likeVideo}
                  likesAddress={ticktock.account.peopleWhoLiked}
                  createComment={createComment}
                  getComments={getComments}
                  commentCount={ticktock.account.commentCount.toNumber()}
                  S
                />;
              })
            )}
          </div>
          <BottomBar
            setNewVideoShow={setNewVideoShow}
            getTicktocks={getTicktocks}
          />
        </div>
      ) : (
        <Signup signup={signup} wallet={wallet.publicKey.toBase58} />
      )}
    </>
  );
};

export default MainView;
