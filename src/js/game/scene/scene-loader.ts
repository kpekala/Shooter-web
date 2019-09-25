import { readSceneJsonFile } from "./scene-files-reader";
import { BLOCK_SIZE, blocksMap } from "../game-utils";

export function generateBlocks(mapId: integer){
    let fileName = `${mapId}.json`;
    return readSceneJsonFile(fileName).then((sceneFileObject: any) => extractListOfBlocks(sceneFileObject.blocks))
}

function extractListOfBlocks(blocksLines: Array<string>){
    let blocks = new Array<any>();
    for(let y = 0; y < blocksLines.length; y++){
        for(let x = 0; x < blocksLines[y].length; x++){
            let blockCode = blocksLines[y].charAt(x);
            if(blocksMap.has(blockCode) && !isBlockEmpty(blockCode)){
                let block = extractBlock(blockCode, x, y);
                blocks.push(block);
            }
        }
    }
    return blocks;
}

function isBlockEmpty(blockCode: string){
    return blocksMap.get(blockCode).imageName == "empty";
}

function extractBlock(code: string, x: integer, y:integer){
    let blockModel = blocksMap.get(code);
    return {
        imageName: blockModel.imageName,
        hasCollider: blockModel.hasCollider,
        x: x * BLOCK_SIZE + BLOCK_SIZE/2,
        y: y * BLOCK_SIZE + BLOCK_SIZE/2
    }
}