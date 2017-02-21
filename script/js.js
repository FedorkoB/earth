window.onload = init();

var render, scene, camera;

var EarthGeometry, EarthMaterial, Earth;
var EarthAtmGeometry, EartAtmhMaterial, EarthAtm;

var container;
function init(){
	var width = window.innerWidth;
	var height = window.innerHeight;
	container = document.createElement('div');
	document.body.appendChild(container);
	
	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 10000000);
	camera.position.set(0, 0, 700);
	
	EarthGeometry = new THREE.SphereGeometry(64, 70, 70);
	var texture = new THREE.Texture();
	var textureloader = new THREE.TextureLoader();
	texture = textureloader.load('source/Earth.jpg');
	EarthMaterial = new THREE.MeshBasicMaterial({map: texture, overdraw: true, transparent: true});
	Earth = new THREE.Mesh(EarthGeometry, EarthMaterial);
	
	EarthAtmGeometry = new THREE.SphereGeometry(70, 40, 40);
	var textureAtm = new THREE.Texture();
	var TextureAtmLoader = new THREE.TextureLoader();
	textureAtm = TextureAtmLoader.load('source/earthAtm.jpg');
	EartAtmhMaterial = new THREE.MeshBasicMaterial({map: textureAtm, overdraw: true, opacity: 0.4, transparent: true});
	EarthAtm = new THREE.Mesh(EarthAtmGeometry, EartAtmhMaterial);
	
	scene.add(Earth, EarthAtm);
	
	render = new THREE.WebGLRenderer({antialias: true, alpha: true});
	render.setSize(width,height);
	render.setClearColor(0x000003);
	render.shadowMap.enabled = true;
	container.appendChild(render.domElement);
	
	var angle = 0;
	
	var controls = new THREE.TrackballControls( camera );
	
	animation();
	
	function animation(){
		requestAnimationFrame(animation);
		render.render(scene, camera);
		
		Earth.rotation.y += 0.01;
		EarthAtm.rotation.y += 0.04;
		
		controls.update();
	}
	
}