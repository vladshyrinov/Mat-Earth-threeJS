var scene = (function() {
    "use strict";
    var scene = new THREE.Scene();
    var renderer = window.WebGLRenderingContext ?
        new THREE.WebGLRenderer({
            alpha: true
        }) : new THREE.CanvasRenderer();

    var camera;
    var earth;

    function InitScene() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('container').appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);

        camera.position.x = -80;
        camera.position.z = 150;

        scene.add(camera);

        var loader = new THREE.TextureLoader();

        loader.load("earth.jpg", function(texture) {
            var material = new THREE.MeshBasicMaterial({
                map: texture
            });
            earth = new THREE.Mesh(new THREE.SphereGeometry(30, 32, 32), material);
            earth.position.x = -90;
            scene.add(earth);
            render();
        });

        render();
    }

    function render() {
        earth.rotation.y += 0.002;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    return {
        initScene: InitScene
    }

})();

window.onload = scene.initScene;