pragma solidity >=0.4.5;
contract Cod{
    address payable public seller;
    address payable public shipper;
    uint public price;
    uint public id = 0;
    uint public hash = 0; 
    mapping(address => uint) public  Balances;
    
    constructor()public payable{
        seller = msg.sender;
    }
    modifier noSeller{
        require(msg.sender != seller);
        _;
    }   
    modifier onlySeller{
        require(msg.sender == seller);
        _;
    }
        struct Package{
         string name;
         uint price;
        
         //string details;
   }
   mapping(uint => Package)packages;
   function Ac1_CreatePackage(string memory _name, uint  _price) onlySeller public{
        id++;
        price = _price;
        packages[id].name = _name;
        packages[id].price = price;
   }
   function GetPackage(uint _id) public onlySeller view returns( string memory _name, uint  _price){
       require(id == _id);
       return(
        packages[_id].name,
        packages[_id].price);
   }
   function Ac2_CreateHash()public onlySeller returns(uint){
     return  hash = uint(keccak256(abi.encodePacked(block.difficulty,now))) % 1500160;
   }
   function GetHash()public view onlySeller returns(uint){
       return hash;
   }
  
   function Ac3_ApplyBuy(uint _id) public noSeller payable returns(uint){
      require(id == _id);
      shipper = msg.sender;
      Balances[shipper] = address(this).balance;
      require(Balances[shipper] == price * 1 ether);
      return Balances[shipper];
  }
    function ConfirmOfShipper(uint _hash)public payable noSeller{
        if(hash ==_hash){
            shipper.transfer(Balances[shipper]);
        }
    }
    function ConFirmOfSeller(uint _hash)public payable onlySeller{
        if(hash ==_hash){
            seller.transfer(Balances[shipper]);
        }
    }
}
