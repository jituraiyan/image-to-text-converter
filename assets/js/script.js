(function(){

  'use strict'

  let _ = selector => document.querySelector( selector )

  // Global variables
  let preview = _('#js-image-preview'),
    isHover = false,
    text,
    isDragging = false,
    outOfWindow = false,
    imagePresent = false,
    previousDragover,
    currentDragover,
    detectionError = false,
    insideImagezone = false


  // Options
  let validTypes = [ 'image/jpeg', 'image/png', 'image/gif' ]

  // If image preview image already has then show it otherwise show the inital state
  let imageZonePrevious = () => {
    imagePresent ? imageZone( 'OK' ) : imageZone( 'DEFAULT' )
  }

  // Dtermines when image zone show what
  let imageZone = state => {

    $('.js-image-default, .js-image-drag, .js-image-error').addClass( 'hidden' )
    $('.js-processing-blur').addClass( 'behind' )
    $('.image-instruction').removeClass( 'blur' )
    if( 'OK' == state ) {
      imagePresent = true
      $('.js-image-preview').removeClass( 'hidden' )
    }else if( 'PROCESSING' == state ) {
      imagePresent = true
      preview.src = ''
      $('.js-image-preview').removeClass( 'hidden' )
      $('.js-processing-blur').removeClass( 'behind' )
    }else{
      if( 'DEFAULT' == state ) {
        imagePresent = false
        $('.js-image-default').removeClass( 'hidden' )
        $('.js-image-preview').addClass( 'hidden' )

      }else if( 'DRAG_OUTSIDE' == state ) {
        $('.image-instruction').addClass( 'blur' )
        $('.js-image-drag').removeClass( 'hidden' )

      }else if( 'DRAG_INSIDE' == state ) {
        $('.js-image-drag').removeClass( 'hidden' )

      }else if( 'ERROR' == state ) {
        let errorDismissTIme = 5000
        $('.js-image-error').removeClass( 'hidden' )
        setTimeout( () => {
          $('.js-image-error').addClass( 'hidden' )
          imageZonePrevious()
        }, errorDismissTIme )
      }
    }
  }

  // Dtermines when image zone show what
  let textZone = state => {
    $('.js-image-text').addClass( 'hidden' )
    $('.js-other-text').addClass( 'hidden' )

    if( 'OK' == state ) {
        $('.js-image-text').removeClass( 'hidden' )
        $('#js-output-text').html()
        $('#js-output-text').html( text.replace(/\n/g, "<br />") )
        $('.js-copy-src').val( text )
    }else{
      if( 'DEFAULT' == state ) {
        $('.js-output-default').removeClass( 'hidden' )
      }else if( 'ERROR' == state ) {
        $('.js-output-error').removeClass( 'hidden' )
      }
    }
  }

  // Manages tooltip show/hide of copy button
  let copyButtonTooltip = state => {

    let delay = 1000,
        transition = 100

    if( 'SHOW' == state ) {
      isHover = true

      setTimeout( () => {
        isHover && $('.js-copy-info').fadeIn( transition )
      }, delay )

    }else if( 'HIDE' == state ) {
      isHover = false
      $('.js-copy-info').fadeOut( transition )
    }
  }

  // Manages tooltip text of copy button and copy text to clipboard
  let copyButtonText = state => {

    if( 'COPY' == state ) {
      $('.js-copy-icon').removeClass( 'green' )
      $('.js-copy-normal').show()
      $('.js-copy-done').hide()

    }else if( 'COPIED' == state ) {

      $('.js-copy-src').trigger( 'select' )
      document.execCommand( 'copy' )

      $('.js-copy-icon').addClass( 'green' )
      $('.js-copy-normal').hide()
      $('.js-copy-done').show()
    }
  }

  // Check file type
  let checkType = file => validTypes.find( type => type == file.type )

  // Load image data from PC folder to browser
  let loadImage = target => {
    return new Promise( ( resolve, reject ) => {

      let file = target.files[0],
          reader  = new FileReader()

      if( file ) {
        if( checkType( file ) ) {
          imageZone( 'PROCESSING' )
          reader.readAsDataURL( file )
          reader.onloadend = () => {
              preview.src = reader.result
              resolve()
          }
        }else{
          imageZone( 'ERROR' )
        }
      }
    } )
  }

  // Convert text of image to string by orcad.js
  let convertText = () => {
    return new Promise( ( resolve, reject ) => {

      preview.onload = () => {
        try{
            text = OCRAD( preview )
        } catch(error) {
            text = ''
            detectionError = true
        }
        resolve( text )
      }
    } )
  }

  // Output text
  let outputText = text => {
      imageZone( 'OK' )
      text ? textZone( 'OK' ) : textZone( 'ERROR' )

      if( detectionError ){
        let refreshTime = 2000
        setTimeout( () => { location.reload() }, refreshTime )
      }
  }

  // Convert an image to text
  let imgToText = target => {
    loadImage( target )
    .then( () => convertText() )
    .then( outputText )
  }

  $(document).ready( () => {

    // DOM Events

    $('#js-trigger-upload').on( 'click', () => {
      $('#js-upload-button').trigger('click')
    })
    $('.js-copy-icon').hover( () => {
      copyButtonTooltip( 'SHOW' )
    }, () => {
      copyButtonTooltip( 'HIDE' )
    } )
    $('.js-copy-icon').on('click', () => {
      let backToNormal = 5000
      copyButtonText( 'COPIED' )
      setTimeout( () => {
        copyButtonText( 'COPY' )
      }, backToNormal )
    })
    $('.js-close').on('click', () => {
      imageZone( 'DEFAULT' )
      textZone( 'DEFAULT' )
    } )
    $('#js-upload-button').on( 'change', e => {

      imgToText( e.target )
      _("#js-upload-button").value = ''
    } )

    $(window).on( 'dragover', e => {
      e.preventDefault()

      currentDragover = e.target == _('.js-image-zone') || $(e.target).closest('.js-image-zone').length

      if( previousDragover != currentDragover ) {

        currentDragover ? imageZone( 'DRAG_INSIDE' ) : imageZone( 'DRAG_OUTSIDE' )
      }
      previousDragover = currentDragover
      isDragging = true
    } )

    $(window).on( 'dragleave', e => {
      let target = e.target

      isDragging = false
      setTimeout( () => {
        !isDragging && imageZonePrevious()
        previousDragover = null
      }, 200 )
    } )

    window.addEventListener( 'drop', e => {
      e.preventDefault()
      let isdropInside = e.target == _('.js-image-zone') || $(e.target).closest('.js-image-zone').length
      isdropInside ? imgToText( e.dataTransfer ) : imageZonePrevious()
      previousDragover = null
    } )

    // Loading animation by MoveIt plugin
    let loader = _('#loader'),
      loadingAnimation = new Moveit( loader, {
        start: '0%',
        end: '0%'
      } )

    let animateLoader = () => {
      loadingAnimation.set({
        start: '0%',
        end: '70%',
        duration: 1.0,
        callback: () => {
          loadingAnimation.set( {
            start: '100%',
            end: '101%',
            duration: 1.0,
            follow: true,
            callback: animateLoader
          } )
        }
      } )
    }
    animateLoader()

  } )

  $(window).on( 'load', () => {
    // Use the jquery custom scrollbar plugin
		$('.image-text-body').mCustomScrollbar( { theme: 'minimal' } )
	} )

}())
