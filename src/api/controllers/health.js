const health = (req, res) => {
  res.status(200).send('Auth service up and running.')
  res.end()
}

export default {
  health
}
