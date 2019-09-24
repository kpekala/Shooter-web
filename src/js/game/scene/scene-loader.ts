import { readSceneJsonFile } from "./scene-files-reader";

let blocksMap = new Map();
blocksMap.set('#','empty');
blocksMap.set('t','trunk');
blocksMap.set('b','brick');
blocksMap.set('s','stone');
blocksMap.set('d','dirt');


export function generateBlocks(mapId: integer){
    let fileName = `${mapId}.json`;
    return readSceneJsonFile(fileName).then((sceneFileObject: any) => extractListOfBlocks(sceneFileObject.blocks))
}

function extractListOfBlocks(blocksLines: Array<string>){
    //Generates block objects with image key and position
    let blocks = new Array<any>();
    blocksLines.forEach((blockLine: string) => {
        for(let blockChar of blockLine){
            console.log(blocksMap.get(blockChar));
        }
    });
}