module.exports = {
    chunckArray: (array, chunkCount) => {
        const chunks = [];
        while (array.length) {
            chunks.push(array.splice(0, chunkCount));
        }
        return chunks;
    },
    randomNumber: (num) => Math.floor(Math.random() * num) + 1,
};
