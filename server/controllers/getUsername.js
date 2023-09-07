export default function getUsername(req, res) {
  if (req.session.user) {
    res.send({ Success: req.session.user })
  } else {
    res.send({ Error: 'Please login.' })
  }
}
