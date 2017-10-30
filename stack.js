console.log("You are awesome!")

const cropContainerGenerator = function* () {
    let currentContainer = 1
    const maximumContainers = 10
    
    while (currentContainer <= maximumContainers) {
        yield { "id": currentContainer, "type": "Trees", "logs": [] }
        currentContainer++
    }
}

/*
Create an instance of the crop container generator function.
`cropContainerFactory` will generate 10 containers.
*/
const cropContainerFactory = cropContainerGenerator()

const forest = [
    {
        "type": "Oak",
        "trees": 9
    },
    {
        "type": "Pine",
        "trees": 12
    },
    {
        "type": "Ash",
        "trees": 6
    },
    {
        "type": "Balsa",
        "trees": 10
    }
]


/*
    Create a skope function to process each tree.

    Lexscopistanian wood processors can produce 4 logs per tree. 
*/

const cropStackSkope = function (trees) {
    // Functionality to convert each tree into 4 logs
    
    // need to wrap this arrow function in parathesis because it is returning an object literal
    const processedTrees = trees.map(
        currentTree => ({
            "type": currentTree.type,
            "logs": Math.floor(currentTree.trees * 4) // each tree can product 4 logs
        })
    )
    return processedTrees;
}

// assign containers to the cropStackSkope defined earlier
cropStackSkope.containers = [];

// convert all trees into logs
let allLogs = cropStackSkope(forest)
//console.log("allLogs: ", allLogs)

// Start filling up the 10 available storage containers which hold 15 logs each

// create a new container
let currentContainer = cropContainerFactory.next().value

// iterate over the allLogs array
allLogs.forEach(
    // Look at each processed tree object
    currentTreeType => {
        
        //console.log("currentTreeType", currentTreeType)
        // loop up to the number of logs
        for (let i=0; i < currentTreeType.logs; i++) {
            // insert a new object into the storage container
            const log = {
                "type": currentTreeType.type,
        }
            currentContainer.logs.push(log)

            // once container is full, get a new container
            if (currentContainer.logs.length === 15) {
                cropStackSkope.containers.push(currentContainer)
                currentContainer = cropContainerFactory.next().value
            }
        }
    }
)

if (currentContainer.logs.length > 0) {
    cropStackSkope.containers.push(currentContainer)
}

console.log("cropStackSkope.containers:", cropStackSkope.containers)