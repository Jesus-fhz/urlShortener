const yup = require("yup");
const {nanoid} = require("nanoid");
const db = require('./config.js');



const schema = yup.object().shape({
    idUrl: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9_-]*$/,'Only letters and numbers')
    .min(5,"Custom name must be at least 5 characters"),
    url: yup.string().trim().url().required(),
});

main = {
  generateUrl: async function (req, res, next) {
    let { idUrl, url } = req.body;
    try {
      await schema.validate({ idUrl, url });  
      if (!idUrl) {
        idUrl = nanoid(8)
      }
      idUrl.toLowerCase();
      const creaetUrl = await db.insert({idUrl,url});
      res.json(creaetUrl);
    } catch (error) {
      if(error.message.startsWith('E11000')) error.message = "Url in use!";
      //ErrorHandling
      next(error);
    }
  },

  findUrl: async function(req, res){
    const {idUrl} = req.params;
    try {
      const getUrl = await db.findOne({idUrl});
      if (getUrl){
        res.redirect(getUrl.url);
      }
      res.redirect(`/`);
    } catch (error) {
      res.redirect(`/`);
    }
  }
};

module.exports = main;
