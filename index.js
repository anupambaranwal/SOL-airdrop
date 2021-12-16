const {Connection,PublicKey, LAMPORTS_PER_SOL} = require("@solana/web3.js");
const solanaWeb3 = require("@solana/web3.js"),

//STEP-1 Generating a new wallet keypair
newPair = new solanaWeb3.Keypair();
console.log(newPair);

//STEP-2 Storing the public and private key
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;

//STEP-3 Getting the wallet Balance
const getWalletBalance = async () => {
  try {
    const connection = new Connection(solanaWeb3.clusterApiUrl("devnet"), "confirmed");
    const walletBalance = await connection.getBalance(
      new PublicKey(publicKey)
    );
    console.log(`=> For wallet address ${publicKey}`);
    console.log(`   Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
  } catch (err) {
    console.log(err);
  }
};

//STEP-4 Air dropping SOL (in terms of LAMPORTS)
const airDropSol = async () => {
  try {
    const connection = new Connection(solanaWeb3.clusterApiUrl("devnet"), "confirmed");
    console.log(`-- Airdropping SOL --`)
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(publicKey),
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

//STEP-5 Driver function
const driverFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}
driverFunction();