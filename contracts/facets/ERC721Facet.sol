// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../libraries/LibAppStorage.sol";

contract MyToken is ERC721, ERC721Burnable, Ownable {

    LibAppStorage.Layout internal layout;
    

    constructor()
        ERC721(layout.NFT_Name, layout.NFT_Symbol)
        Ownable(layout.owner)
    {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = layout._nextTokenId++;
        _safeMint(to, tokenId);
    }
}
