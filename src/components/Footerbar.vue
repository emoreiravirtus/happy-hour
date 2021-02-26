<template>
  <footer class="page-footer red">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <p class="grey-text text-lighten-4">
            2512  Eva Pearl Street, Innis - Louisiana
          </p>
          <p>
              Phone 225-492-8260
          </p>
          <p>
              Mobile 337-802-5328
          </p>
        </div>
        <div class="col l4 offset-l2 s12">
          <h5 class="white-text">Need Help?</h5>
          <ul>
            <li>Email: email@email.com</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
        © {{ new Date().getFullYear() }}
      </div>
    </div>
  </footer>
</template>

<script>
export default {
    name: "Footerbar"
};
</script>

<style>
.footer-photo-container{
  position: relative;
  overflow: hidden;
    height: 15em;
}
#clip {
  position: absolute;
    clip: rect(0, 600px, 280px, 0);
    opacity: 0.7;
}
.page-footer{
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>