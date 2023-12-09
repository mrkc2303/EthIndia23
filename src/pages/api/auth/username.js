export default async (req, res) => {
    console.log(`https://api.github.com/user/${req.userID}`)
    fetch(`https://api.github.com/user/${req.userID}`)

    return res;
}