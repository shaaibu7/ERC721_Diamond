// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

library LibAppStorage {
    struct Layout {
        uint256 _nextTokenId;
        string NFT_Name;
        string NFT_Symbol;
        address owner;
    }

    bytes32 constant APP_STORAGE_POSITION =
        keccak256("diamond.standard.app.storage");



    function storageLocation() external pure returns(Layout storage l) {
        bytes32 position = APP_STORAGE_POSITION;
        assembly {
            l.slot := position
        }
    }


}