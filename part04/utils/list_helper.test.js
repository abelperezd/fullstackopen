
const dummy = (blogs) => {
    return 1;
}

const totalLikes = (posts) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return posts.length === 0
        ? 0
        : posts.reduce(reducer, 0)

}

module.exports = {
    dummy,
    totalLikes
}