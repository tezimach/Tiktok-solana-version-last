import * as anchor from '@project-serum/anchor'
import {WalletNotConnectedError}from '@solana/wallet-adapter-base'
import { TOKEN_PROGRAM_ID , TICKTOCK_IDL, TICKTOCK_PROGRAM_ID } from './const'

export function getProgramInstance( connection , wallet){
    if(!wallet.publicKey) throw new WalletNotConnectedError()

    const provider = new anchor.AnchorProvider(
        connection ,
        wallet,
        anchor.AnchorProvider.defaultOptions()
    );
    const idl = TICKTOCK_IDL

    const programId = TICKTOCK_PROGRAM_ID
    const program = new(anchor).Program(idl,programId ,provider);
    return program;

     
} 