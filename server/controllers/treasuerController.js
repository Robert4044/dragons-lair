module.exports = {
    dragonTreasure: async (req, res) => {
        const db = req.app.get('db')
        const result = await db.get_dragon_treasure(1)
        res.status(200).send(result)
    },
    getUserTreasure: async (req, res) => {
        const db = req.app.get('db')
        const userTreasure = await db.get_user_treasure([req.session.user.id])
        return res.status(200).send(userTreasure)
    },
}
