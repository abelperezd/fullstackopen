
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

const favoriteBlog = (posts) => {
    const reducer = (prevPost, currPost) => {
        return (prevPost.likes > currPost.likes) ? prevPost : currPost;
    }

    return posts.length === 0
        ? 0
        : posts.reduce(reducer)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}