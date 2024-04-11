import { Contract, ethers,utils } from "ethers";
import abi from "@/smc/abi.json";
import {formatDateTime} from "@/utils/formatTime"
const initProvider = () => {
  if (!window.ethereum)
    throw new Error(
      "install MetaMask wallet to use,reload page when you installed"
    );

  return new ethers.providers.Web3Provider(window.ethereum);
};

const getAddress = async () => {
  try {
    let address: string = "";
    let provider = initProvider();
    address = await provider.send("eth_requestAccounts", []);

    return address[0];
  } catch (error: any) {
    throw new Error("User denied account access or you can login Wallet");
    // throw new Error(error.message);
  }
};

//  contract
const initContract = async () => {
  
  let provider = initProvider();

  const contract = new Contract(
    "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    abi.abi,
    provider
  );
  return { contract, provider };
 
};

/* lưu ý: khi triển khai hàm thì bên thực thi hàm sẽ phải chịu phí gas */
const addProducts = async (name = "", imageLink = "") => {
  if (!name || !imageLink) {
    console.error("Name and image link are required");
    return;
  }

  try {
    const { contract, provider } = await initContract();

    let accounts = await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner(accounts[0]);

    // Kết nối đối tượng Contract với đối tượng Signer
    const contractWithSigner = contract.connect(signer);

    // Gọi hàm addProduct
    const transaction = await contractWithSigner.addProduct(name, imageLink);
    console.log("Transaction hash:", transaction.hash);

    // Chờ cho giao dịch được xác nhận
    const receipt = await transaction.wait();
    console.log("Transaction receipt:", receipt);
  } catch (error) {
    console.error("Error:", error);
  }
};

const getProducts = async (page: number, limit: number) => {
  const { contract } = await initContract();
  try {
    
    const products = await contract.getPaginationProduct(limit,page);
    let result = products.map((product:any) =>{
      return{
        id: ethers.BigNumber.from(product["productId"]._hex).toNumber(),
        name: product["name"],
        image:product["imageLink"]
       }
     }    
      ).filter((value:any)=> value.id !==0)

      console.log("Products:1", result);
      return result;
   
  } catch (error: any) {
    console.log("Products on page", error);
  }
};

const getProductsOwner =async() =>{
  const { contract } = await initContract();
  try{
    const products = await contract.getProductOwners();
    let result = products.map((product:any) =>{
      return{
        id: ethers.BigNumber.from(product["productId"]._hex).toNumber(),
        name: product["name"],
        image:product["imageLink"]
       }
     }    
      ).filter((value:any)=> value.id !==0)

      console.log("Products:1", result);
      return result;
  } catch (error) {
    console.log("Products on page", error);
  }
}

const feedback = async (props:{productId:number,reviewText:string,rating:number}) => {
  try {
    const { contract, provider } = await initContract();

    let accounts = await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner(accounts[0]);

    // Kết nối đối tượng Contract với đối tượng Signer
    const contractWithSigner = contract.connect(signer);
     //
     let productId = ethers.BigNumber.from(props.productId)
     
     let time = formatDateTime(new Date().getTime())
    
    // Gọi hàm addProduct
    const transaction = await contractWithSigner.feedbackProduct(productId,props.reviewText,props.rating,time);
    console.log("Transaction hash:", transaction.hash);

    // Chờ cho giao dịch được xác nhận
    const receipt = await transaction.wait();
    console.log("Transaction receipt:", receipt);
  } catch (error) {
    console.error("Error:", error);
  }
};

const getRateProduct = async ()=>{
  const { contract } = await initContract();
  try {
    const products = await contract.getRatingProduct();
    console.log("Products on page", products);
  } catch (error) {
    console.log("Products on page", error);
  }
}


export default {
  getAddress,
  addProducts,
  getProducts,
  getProductsOwner,feedback,getRateProduct
};
