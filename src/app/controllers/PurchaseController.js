const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchasead = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    await Mail.sendMail({
      from: '"Felipe Araujo" <felipebang3@gmail.com>',
      to: purchasead.author.email,
      subject: `Solicitação de compra: ${purchasead.title}`,
      template: 'purchase',
      context: { user, content, ad: purchasead }
    })

    return res.send()
  }
}

module.exports = new PurchaseController()
