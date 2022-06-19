function solution(array, commands) {
    return commands.map(command => {
        const [sPosition, ePosition, position] = command
        const newArray = array
            .slice(sPosition-1, ePosition)
            .sort((a,b) => a - b)    

        return newArray[position - 1]
    })
}