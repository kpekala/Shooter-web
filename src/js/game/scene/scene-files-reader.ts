export function readSceneJsonFile(fileName: string){
    let pathToFile = `/assets/scenes/${fileName}`;
    return fetch(pathToFile).then(data => data.json())
}