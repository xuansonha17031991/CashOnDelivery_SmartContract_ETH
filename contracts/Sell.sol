pragma solidity >=0.4.5;
contract Sell{
    address payable public seller;
    address payable public buyer;
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
         string details;
   }
   mapping(uint => Package)packages;
   
   function Ac1_CreatePackage(string memory _name, uint  _price,string memory _details) onlySeller public{
        id++;
        price = _price;
        packages[id].name = _name;
        packages[id].price = price;
        packages[id].details = _details;
   }
   function GetPackage(uint _id) public onlySeller view 
   returns( string memory _name, uint  _price,string memory _details){
       require(id == _id);
       return(
        packages[_id].name,
        packages[_id].price,
        packages[_id].details);
   }
      
   
   function Ac2_CreateHash()public onlySeller returns(uint){
     return  hash = uint(keccak256(abi.encodePacked(block.difficulty,now))) % 1500160;
   }
   function GetHash()public view onlySeller returns(uint){
       return hash;
   }
  
   function Ac3_ApplyBuy(uint _id) public noSeller payable returns(uint){
      require(id == _id);
      buyer = msg.sender;
      Balances[buyer] = address(this).balance;
      require(Balances[buyer] == price * 1 ether);
      return Balances[buyer];
  }
    function ConfirmOfBuyer(uint _hash)public payable noSeller{
        if(hash ==_hash){
            buyer.transfer(Balances[buyer]);
        }
    }
    function ConFirmOfSeller(uint _hash)public payable onlySeller{
        if(hash ==_hash){
            seller.transfer(Balances[buyer]);
        }
    }
}