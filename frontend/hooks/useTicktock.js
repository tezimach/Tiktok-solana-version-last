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
  console.log('Video has been liked!')
  const tx= await program.rpc.likeVideo({
    accounts:{
    video:new PublicKey(address),
    authority:wallet.publicKey,
    ...defaultAccounts
    },
  })
  console.log(tx)
 }

 const createComment= async(addresss, count , comment)=>{
    let [comment_pda] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            utf8.encode('comment'),
            new PublicKey(address).toBuffer(),
            new BN(count).toArrayLike(Buffer, 'be', 8),
    ],
    program.programId,
      )
    
      if(userDetail)
      {
        const tx = await program.rpc.createComment(
            comment,
            userDetail.userName,
            userDetail.userProfileImage,
            {
            accounts:{
                Video: new PublicKey(address),
                comment: comment_pda,
                authority: wallet.publicKey,
                ...defaultAccounts
    
            },
        },
        )
        console.log(tx)
      }
     }
    
    

 const  newVideo = async()=>{
    const randomKey = anchor.web3.Keypair.generate().publicKey;

    let [video_pda]=  anchor.web3.PublicKey.findProgramAddressSync(
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
  let commentSigners=[]
  for(let i = 0; i < count; i++)
  {
    let [commentSigner]= anchor.web3.PublicKey.findProgramAddressSync(
        [
            utf8.encode('comment'),
            new PublicKey(address).toBuffer(),
            new BN(1).toArrayLike(Buffer,'be',8)
        ],
        program.programId,
    )
    commentSigners.push(commentSigner)
  }

  const comments = await program.account.commentAccount.fetchMultiple(
    commentSigners,
  )

  console.log(comments)
  return comments
 }
 return { getTicktocks , likeVideo , createComment , newVideo , getComments}
}

export  default useTicktock;