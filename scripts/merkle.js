var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var fs = require('fs');
var csv = require('csv-parser');
var keccak256 = require('ethers').keccak256;
var MerkleTree = require('merkletreejs').MerkleTree;
var ethers = require('ethers').ethers;
var log = require('console').log;
// console.log(fs);
var computeHash = function (filePath) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        result = [];
        return [2 /*return*/, new Promise(function (resolve, reject) {
                fs.createReadStream(filePath)
                    .pipe(csv())
                    .on('data', function (row) {
                    var address = row['address'];
                    var amount = row['amount'];
                    var hash = ethers.solidityPackedKeccak256(["address", "uint256"], [address, amount]);
                    result.push(hash);
                })
                    .on('end', function () {
                    resolve(result);
                });
            })];
    });
}); };
var data = function () { return __awaiter(_this, void 0, void 0, function () {
    var result, data_1, levaes, tree, root, leaf, proof, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, computeHash('./userData/users.csv')];
            case 1:
                result = _a.sent();
                data_1 = result.join('\n');
                fs.writeFile('userHash.json', data_1, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
                levaes = result.map(function (item) { return (item); });
                tree = new MerkleTree(levaes, keccak256, { sort: true });
                root = tree.getHexRoot();
                leaf = result[0];
                proof = tree.getHexProof(leaf);
                console.log(tree.verify(proof, leaf, root));
                console.log("This is the merkle root, ".concat(root));
                console.log("this is the merkle proof ".concat(proof));
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
console.log(data());
