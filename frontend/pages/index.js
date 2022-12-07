import MainView from "../components/MainView";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  const { connected } = useWallet();
  return (
    <div className="app">
      {connected ? (
        <MainView />
      ) : (
        <div classNmae="loginContainer">
          <div className="loginTitle">Login to ticktock </div>
          <div className="loginSubTitle">
            manage your account , check notifications , comment on videos , more
            ..
          </div>
          <WalletMultiButton />
        </div>
      )}
    </div>
  );
}
