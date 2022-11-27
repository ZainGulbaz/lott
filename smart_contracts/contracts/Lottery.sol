pragma solidity ^0.8.0;

contract Lottery {
    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }
    address public manager;
    address payable[] internal participants;

    constructor() {
        manager = msg.sender;
    }

    receive() external payable {
        require(
            msg.value >= 0.01 ether && msg.value < 0.012 ether,
            "You need to transact 0.01 ether"
        );
        participants.push(payable(msg.sender));
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function random() internal view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        participants.length
                    )
                )
            );
    }

    function getWinner() public {
        require(
            msg.sender == manager,
            "This function can only be accessed by the manager"
        );
        uint index = random() % participants.length;
        address payable winner = participants[index];
        winner.transfer(getBalance());
        participants = new address payable[](0);
    }

    function getParticipants() public view returns (address payable[] memory) {
        return participants;
    }
}
