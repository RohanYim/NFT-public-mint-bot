// 监控单个钱包

// 监控10个钱包 如果80%及以上购买了 就自动购买（未完成）
// 1. 监控并记录在数据库中

const Web3 = require('web3');

class TransactionChecker {
    web3;
    account;

    constructor(account) {
        this.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"));
        this.account = account.toLowerCase();
    }

    async checkBlock() {
        let block = await this.web3.eth.getBlock('latest');
        let number = block.number;
        console.log('Searching block ' + number);

        if (block != null && block.transactions != null) {
            for (let txHash of block.transactions) {
                let tx = await this.web3.eth.getTransaction(txHash);
                // console.log(tx);
                if (tx.from == null){
                    continue;
                }
                if (this.account == tx.from.toLowerCase()) {
                    console.log('Transaction found on block: ' + number);
                    console.log({address: tx.to, input: tx.input, value:tx.value});
                }
            }
        }
    }
}

let txChecker = new TransactionChecker('0x823dc685e777a7523954388fa7933da770f49d42');
setInterval(() => {
    txChecker.checkBlock();
}, 15 * 1000);





// 用hex data购买
// const { SSL_OP_EPHEMERAL_RSA } = require("constants");
// const Web3 = require("web3");
// const fs = require('fs')
// const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")); // testnet
// // const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")); // mainnet

// // personal info
// const private_key = ["c121e2115bdc252500fc71081145385360a15bf7435385f221dfced39fff2153"];
// const wallet_address = ["0x0c6dD9edd0D92c4Cfeed734eEedD6Bf8b7fAf489"];

// const wallet_key_dict = {
//     "0x0c6dD9edd0D92c4Cfeed734eEedD6Bf8b7fAf489" : "c121e2115bdc252500fc71081145385360a15bf7435385f221dfced39fff2153"
// }

// const contractAddress = "0x4d24cae3ab062293a3ffa3a78b72d82561e84419";

// // mint function
// async function mint(nonce, gasfee, maxP, wallet,key,value) {
//     //the transaction
//     const tx = {
//       'from': wallet,
//       'to': contractAddress,
//       'nonce': nonce,
//       'value': value,
//       'gas': 120000,  // gaslimit: 能小尽量小
//       'maxPriorityFeePerGas': maxP,  //priorityfee
//       'maxFeePerGas': gasfee, // gas
//       'data': '0xa0712d680000000000000000000000000000000000000000000000000000000000000001',
//       'chainId': 4,
//     };
//     const signPromise = web3.eth.accounts.signTransaction(tx, key);
//     nonce = nonce + '\n';
//     fs.writeFile('nonce.txt', nonce, { flag: 'a+' }, err => {});
//     signPromise.then((signedTx) => {
//       web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
//         if (!err) {
//             console.log("The hash of your transaction is: ", hash);
//             console.log('Transaction pending...');
//         } else {
//             console.log("Something went wrong when submitting your transaction:", err)
//         }
//       });
//     }).catch((err) => {
//       console.log("Promise failed:", err);
//     });
//   }

// // speed up function
// async function speedup(wallet, nonce) {
//     const speedup_wallet = wallet;
//     const speedup_key = wallet_key_dict[speedup_wallet];
//     const speedup_nonce = nonce;

//     const speedup_maxP = web3.utils.toWei('50', 'gwei');   // 加速需要大于原来的10%
//     const speedup_gasfee = web3.utils.toWei('600', 'gwei'); // 加速需要大于原来的30%
//     const speedup_value = web3.utils.toWei('0.12', 'ether');
//     mint(speedup_nonce,speedup_gasfee,speedup_maxP,speedup_wallet,speedup_key, speedup_value);

// }

// // mint function
// function mint_func(){
//     if (fs.existsSync("nonce.txt")){
//         fs.unlinkSync("nonce.txt");
//     }
//     for(var wallet_id=0;wallet_id<private_key.length;wallet_id++){
//         const nonce = web3.eth.getTransactionCount(wallet_address[wallet_id], 'latest'); 
//         const maxP = web3.utils.toWei('2', 'gwei');
//         const gasfee = web3.utils.toWei('40', 'gwei');
//         const wallet = wallet_address[wallet_id];
//         const key = private_key[wallet_id];
//         const value = web3.utils.toWei('0', 'ether');
//         mint(nonce,gasfee,maxP,wallet,key,value);
//     }
// }


// // speedup
// function speedup_func(){
//     fs.readFile('nonce.txt', 'utf8' , (err, data) => {
//         if (err) {
//           console.error(err)
//           return
//         }
//         var nonce_list = data.toString().split("\n");
//         for(let i=0; i<nonce_list.length;i++){
//             speedup(wallet_address[i],nonce_list[i]);
//         }
//       })
// }


// // main function
// // 循环监控status后自动启动
// const monitor = false;
// const sleep = require("sleep")
// async function monitor_mint(){
//     var result = false;
//     if(monitor == true){
//         while(true){
//             let result = await contract.methods.saleActive().call()
//             console.log(result);
//             sleep.msleep(1000);
//             if(result == true){
//                 break;
//             }
//         }
//     }
//     mint_func();
// }

// monitor_mint();


