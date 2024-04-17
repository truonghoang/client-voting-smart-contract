import { Contract, ethers } from "ethers";
import abi from "@/smc/abi.json";
import { formatDateTime } from "@/utilizings/formatTime";
const initProvider = () => {
  if (!window.ethereum)
    throw new Error(
      "install MetaMask wallet to use,reload page when you installed"
    );

  return new ethers.providers.Web3Provider(window.ethereum);
};

const getAddress = async () => {
  try {
    let address;
    let provider = initProvider();
    address = await provider.send("wallet_requestPermissions", [
      { eth_accounts: {} },
    ]);

    return address[0].caveats[0]["value"];
  } catch (error) {
    console.log(error);
    if (error.code === 4001) {
      throw new Error(error.message);
    } else {
      throw new Error("User denied account access or you can login Wallet");
    }
   
  }
};

//  contract
const initContract =  () => {
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
    const { contract, provider } =  initContract();

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

const getProducts = async (page, limit) => {
  const { contract } =  initContract();
  try {
    const products = await contract.getPaginationProduct(limit, page);
    let result = products
      .map((product) => {
        return {
          id: ethers.BigNumber.from(product["productId"]._hex).toNumber(),
          name: product["name"],
          image: product["imageLink"],
        };
      })
      .filter((value) => value.id !== 0);

    console.log("Products:1", result);
    return result;
  } catch (error) {
    console.log("Products on page", error);
  }
};

const getProductsOwner = async () => {
  const { contract } =  initContract();
  try {
    const products = await contract.getProductOwners();
    let result = products
      .map((product) => {
        return {
          id: ethers.BigNumber.from(product["productId"]._hex).toNumber(),
          rate: product["rate"],
        };
      })
      .filter((value) => value.id !== 0);

    console.log("Products:1", result);
    return result;
  } catch (error) {
    console.log("Products on page", error);
  }
};


const feedback = async (props) => {
  try {
    const { contract, provider } =  initContract();

    let accounts = await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner(accounts[0]);

    // Kết nối đối tượng Contract với đối tượng Signer
    const contractWithSigner = contract.connect(signer);
    //
    let productId = ethers.BigNumber.from(props.productId);

    let time = formatDateTime(new Date().getTime());

    // Gọi hàm addProduct
    const transaction = await contractWithSigner.feedbackProduct(
      productId,
      props.reviewText,
      props.rating,
      time
    );
    console.log("Transaction hash:", transaction.hash);

    // Chờ cho giao dịch được xác nhận
    const receipt = await transaction.wait();
    console.log("Transaction receipt:", receipt);
  } catch (error) {
    console.error("Error:", error);
  }
};

const getRateProduct = async () => {
  const { contract } =  initContract();
  try {
    const products = await contract.getRatingProduct();
    return products;
  } catch (error) {
    console.log("Products on page", error);
  }
};

const getDetailFeedBack = async (productId) => {
  const { contract } =  initContract();
  try {
    const product = await contract.detailProductVote(productId);
    return product;
  } catch (error) {
    console.log("Products on page", error);
  }
};

const listenEventAddProduct =  function () {

  const {contract} =  initContract()

  contract.on("ProductAdded",(arg1)=>{
     console.log(arg1)
   

  })

  return {contract}
  
}
export default {
  getAddress,
  addProducts,
  getProducts,
  getProductsOwner,
  feedback,
  getRateProduct,
  getDetailFeedBack,listenEventAddProduct
  
};
