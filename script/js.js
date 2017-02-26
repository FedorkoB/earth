window.onload = init();

var render, scene, camera;

var EarthGeometry, EarthMaterial, Earth;
var EarthAtmGeometry, EartAtmhMaterial, EarthAtm;

var MoonGeometry, MoonMaterial, Moon;

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
	textureAtm = TextureAtmLoader.load('source/earthAtm.png');
	EartAtmhMaterial = new THREE.MeshBasicMaterial({map: textureAtm, overdraw: true, transparent: true});
	EarthAtm = new THREE.Mesh(EarthAtmGeometry, EartAtmhMaterial);
	
	/*EarthAtmGeometry = new THREE.SphereGeometry(70, 40, 40);
	var textureAtm = new THREE.Texture();
	var TextureAtmLoader = new THREE.TextureLoader();
	textureAtm = TextureAtmLoader.load('source/earthAtm.jpg');
	EartAtmhMaterial = new THREE.MeshBasicMaterial({map: textureAtm, overdraw: true, opacity: 0.4, transparent: true});
	EarthAtm = new THREE.Mesh(EarthAtmGeometry, EartAtmhMaterial);*/
	
	MoonGeometry = new THREE.SphereGeometry(20, 15, 15);
	var MoonTexture = new THREE.Texture();
	var MoonTxtrLoader = new THREE.TextureLoader();
	MoonTexture = MoonTxtrLoader.load('source/MoonTxtr.jpg');
	MoonMaterial = new THREE.MeshBasicMaterial({map: MoonTexture, overdraw: true});
	
	Moon = new THREE.Mesh(MoonGeometry, MoonMaterial);	
	Moon.position.set(Earth.position.x+200, Earth.position.y+75, Earth.position.z ); 	
	
	Moon.geometry.applyMatrix(new THREE.Matrix4().makeTranslation( Earth.position.x+200, Earth.position.x+5, 0 ) );
	
	scene.add(Earth, EarthAtm, Moon);
	
	render = new THREE.WebGLRenderer({antialias: true, alpha: true});
	render.setSize(width,height);
	render.setClearColor(0x000003);
	render.shadowMap.enabled = true;
	container.appendChild(render.domElement);
	
	var angle = 0;
	
	var controls = new THREE.TrackballControls( camera );
	
	animation();
	
	var angle = 0;
	
	function animation(){
		requestAnimationFrame(animation);
		render.render(scene, camera);
		
		Earth.position.y = Math.sin(angle*0.1)*150;
		Earth.position.x = Math.sin(angle*0.1)*120;
		Earth.position.z = Math.cos(angle*0.1)*150;
		Earth.rotation.y += 0.01;
				
		EarthAtm.position.y = Earth.position.y;
		EarthAtm.position.x = Earth.position.x;
		EarthAtm.position.z = Earth.position.z;
		
		Moon.position.y = Earth.position.y;
		Moon.position.x = Earth.position.x;
		Moon.position.z = Earth.position.z;
		
		
	
		
		Moon.rotation.y += 0.01;
		EarthAtm.rotation.y += 0.01;
		Earth.rotation.y += 0.01;
		EarthAtm.rotation.y += 0.04;
		
		angle += Math.PI/180*2;
		
		controls.update();
	}
	
}