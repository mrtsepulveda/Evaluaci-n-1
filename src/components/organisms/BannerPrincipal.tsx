function BannerPrincipal() {
  return (
    <section className="position-relative banner-principal">
      <img src="/img/banner_maestros.jpg" alt="Banner Ferretería Los Maestros" className="w-100" style={{ maxHeight: 420, objectFit: 'cover' }} />
      <div className="banner-texto text-center text-white rounded p-3 p-md-4">
        <h2 className="h3">Bienvenidos a nuestra ferretería</h2>
        <p className="mb-0">
          Atendiendo a particulares y contratistas en La Serena con los mejores materiales de construcción y herramientas de uso profesional.
        </p>
      </div>
    </section>
  )
}

export default BannerPrincipal
