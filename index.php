<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Image to text converter</title>
  <!-- Google fonts -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Karla" rel="stylesheet">
  <!-- CSS file links -->
  <link rel="stylesheet" href="assets/css/bootstrap.3.2.0.min.css">
  <link rel="stylesheet" href="assets/css/scrollbar.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>

  <!-- MAIN SECTION STARTS -->
  <section class="main">
    <div class="container">

      <div class="image-area pull-left">
        <span class="big">Image</span>
        <div class="image-area-inner js-image-zone">

          <div class="image-instruction js-image-instruction">
            <div class="image-default js-image-default">
              <i class="material-icons">system_update_alt</i>
              <p><span id="js-trigger-upload">Choose a image</span> or Drag it here.</p>
            </div>
            <div class="image-drag js-image-drag hidden">
              <p>Drop it here.</p>
            </div>
            <div class="image-error js-image-error hidden">
              <i class="material-icons">error_outline</i>
              <p>This file is not and Image.<br><small>You can upload <strong>.jpg</strong>, <strong>.jpeg</strong>, <strong>.png</strong> and <strong>.gif</strong> only</small></p>
            </div>
          </div> <!-- image-instruction ends -->

          <div class="image-preview js-image-preview hidden">
            <div class="contain-image">
              <i class="material-icons js-close">close</i>
              <img id="js-image-preview" src="" alt="">
            </div>
          </div>
          <div class="processing-blur js-processing-blur behind">
            <svg width="120" height="120">
              <circle id="loader" cx="60" cy="60" r="20"></circle>
            </svg>
          </div>

        </div> <!-- image-area-inner ends -->

        <form action="">
          <div class="upload-button-container">
            <button type="button">Choose a image</button>
            <input type="file" id="js-upload-button" />
          </div>
        </form>

      </div><!-- image-area ends -->

      <div class="middle-area pull-left">
        <i class="material-icons">trending_flat</i>
      </div>

      <div class="text-area pull-left">
        <span class="big">Text</span>
        <div class="text-area-inner">

          <div class="image-text js-image-text hidden">
            <div class="image-text-top clearfix">
              <p class="pull-left">Text found:</p>
              <div class="pull-right copy-container">
                <i class="material-icons js-copy-icon">content_copy</i>
                <div class="copy-info js-copy-info">
                  <span class="js-copy-normal">Copy to clipboard</span>
                  <span class="js-copy-done">Copied</span>
                </div>
              </div>
            </div>
            <div class="image-text-body content">
              <p id="js-output-text"></p>
              <textarea class="sr-only js-copy-src"></textarea>
            </div>
          </div> <!-- image-text ends -->

          <div class="other-text other-text-default js-other-text js-output-default">
            <p>Image will be converted to plain text.</p>
          </div>

          <div class="other-text other-text-error js-other-text js-output-error hidden">
            <p>Can't recognize any text from this image.</p>
          </div>

        </div> <!-- text-area-inner ends -->
      </div><!-- text-area ends -->
    </div> <!-- container ends -->
  </section>
  <!-- MAIN SECTION ENDS -->


  <!-- FOOTER STARTS -->
  <footer>
    <div class="container">
      <p>This conversion is powered by <a href="https://github.com/antimatter15/ocrad.js" target="_blank">ocrad.js</a></p>
    </div>
  </footer>
  <!-- FOOTER ENDS -->

  <!-- Javascript file links -->
  <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
  <script src="assets/js/ocrad.min.js"></script>
  <script src="assets/js/scrollbar.min.js"></script>
  <script src="assets/js/moveit.0.4.min.js"></script>
  <script src="assets/js/script.js"></script>
</body>
</html>
