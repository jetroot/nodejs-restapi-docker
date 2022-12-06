export const welcome = (req, res) => {
    try {
        res.status(200).json({ msg: "welcome mvc" });
    } catch (err) {
        res.status(500).json({ msg: `Error: ${err}` });
    }
};
