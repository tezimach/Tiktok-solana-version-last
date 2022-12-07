import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import {PublicKey} from '@solana/web3.js';
import { SOLANA_HOST } from "../utils/const";
import { getProgramInstance } from "../utils/utils";

const anchor =require('@project-serum/anchor')
const utf8 =  anchor.utils.bytes.utf8
const {BN, web3}= anchor
const{SystemProgram}=web3

const defaultAccounts={
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId,
}

const useTicktock=(
    setTicktocks,
    userDetail,
    videoUrl,
    description,
    setDescription,
    SetVideoUrl,
    SetNewVideoShow,
)=>{
const wallet = useWallet()
const connection = anchor.web3.Connection(SOLANA_HOST)
const program =getProgramInstance(connection, wallet)
const getTicktocks =async()=>{
 console.log('Fetching')

 const videos = await program.account.videoAcount.all()
 console.log(videos)

 setTicktocks(videos)


 }

 const likeVideo = async (address)=>{

 }

 const createComment= async(addresss, count , comment)=>{

 }

 const  newVideo = async()=>{
    const randomKey = anchor.web3.Keypair.generate().publicKey;

    let [video_pda]= await anchor.web3.PublicKey.findProgramAddressSync(
        [utf8.encode('video'), randomKey.toBuffer()],
        program.programId,
    )

    const tx = await program.rpc.creatVideo(
        description,
        videoUrl,
        userDetail.userName,
        userDetail.userProfileImage,
        {
            acounts:
            {
                video: video_pda,
                randomkey: randomKey,
                authority: wallet.publicKey,
                ... defaultAccounts
            }
        }

    )
    console.log(tx)
    setDescription('')
    SetVideoUrl('')
    SetNewVideoShow(false)

 }
 const getComments = async(address, count)=>{

 }

 return { getTicktocks , likeVideo , createComment , newVideo , getComments}

}

export  default useTicktock;