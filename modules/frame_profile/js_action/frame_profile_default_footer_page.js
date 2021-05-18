class frame_profile_default_footer_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = false;
    }

    includecssFile()
    {
        var headID = document.getElementsByTagName("head")[0];
        var newCss = document.createElement('link');
        newCss.type = 'text/css';
        newCss.rel = "stylesheet";
        newCss.href = "css/headerstyle.css";
        headID.appendChild(newCss);
        console.log(newCss);
    }
    showResult(xhttp) {
        var str = `
        <!-- Footer -->
        <footer class="page-footer  elegant-color-dark pt-4">

            <!-- Footer Links -->
            <div class="container-fluid text-center text-md-left">

                <!-- Grid row -->
                <div class="row">
                    <div class="col-md-2"></div>
                    <!-- Grid column -->
                    <div class="col-md-4 mt-md-0 mt-3">

                        <!-- Content -->
                        <h5 class="text-uppercase">投資策略交易平台</h5>
                        

                    </div>
                    <!-- Grid column -->

                    <hr class="clearfix w-100 d-md-none pb-3">

                    <!-- Grid column -->
                    <div class="col-md-2 mb-md-0 mb-3" align="center">

                        <!-- Links -->
                        <h5 class="text-uppercase mb-3">關於我們</h5>

                        <ul class="list-unstyled">
                            <li>
                                <a href="#!">團隊成員</a>
                            </li>
                            <li>
                                <a href="#!">隱私政策</a>
                            </li>
                            <li>
                                <a href="#!">線上租賃商店</a>
                            </li>
                            <li>
                                <a href="#!">會員中心</a>
                            </li>
                        </ul>

                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-2 mb-md-0 mb-3" align="center">

                        <!-- Links -->
                        <h5 class="text-uppercase mb-3">關注我們</h5>

                        <ul class="list-unstyled">
                            <li>
                                <a class="my-4" href="#!"><i class="fab fa-facebook-square fa-lg"></i>Facebook</a>
                            </li>
                            <li>
                                <a class="my-4" href="#!"><i class="fab fa-twitter-square fa-lg"></i>Twitter</a>
                            </li>
                            <li>
                                <a class="my-4" href="#!"><i class="fab fa-google-plus-square fa-lg"></i>Google+</a>
                            </li>
                            <li>
                                <a class="my-4" href="#!"><i class="fab fa-instagram fa-lg"></i>Instagram</a>
                            </li>
                        </ul>

                    </div>
                    <!-- Grid column -->
                    <div class="col-md-2"></div>
                </div>
                <!-- Grid row -->

            </div>
            <!-- Footer Links -->

            <!-- Copyright -->
            <div class="footer-copyright text-center py-3">© 2019 Copyright:
                <a href="https://ic.nkust.edu.tw/app/home.php">國立高雄科技大學智慧商務系</a>
            </div>
            <!-- Copyright -->

        </footer>
        <!-- Footer -->
`;
        document.getElementById(this.position_id).innerHTML = str;
    }
    //this.loadModuleScript(this.module, "show_manage_page");
}