exports.getHome = (req, res) => {
  res.render('home', {
    title: 'Mediation Services Texas & USA | Online Dispute Resolution | Valor Mediation, LLC',
    metaDescription: 'Looking for professional mediation services in Texas or nationwide? Valor Mediation, LLC offers online dispute resolution for business, family, workplace, and legal conflicts. Fast, confidential, and cost-effective mediation via Zoom. Free consultation available.',
    user: req.user,
  });
};