
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
console.log("ok")
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(0,3,10);

const renderer = new THREE.WebGLRenderer({antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true; //影をつける

//床の作成
const meshFloor = new THREE.Mesh(
new THREE.BoxGeometry(2000, 0.1, 2000),
new THREE.MeshStandardMaterial());

//床に影を落す
meshFloor.receiveShadow = true;
scene.add(meshFloor);

// ---------- GLB の読み込み ----------
const loader = new GLTFLoader()

const glbPath1 = "./model/shop.glb"
const glbPath2 = "./model/kasei.glb"
const glbPath3 = "./model/tikyuu.glb"

//1個目のオブジェクトを読み込み
  loader.load(
  glbPath1,
  function (gltf) {
    const model1 = gltf.scene; //<-ここの変数を増やす
    
    // モデルのサイズや位置を調整
    model1.scale.set(0.5, 0.5, 0.5); //モデルの大きさを調整
    model1.rotation.set(0, Math.PI / 2, 0); // モデルの回転を調整
    model1.position.set(0, 0, 0);//モデルの位置を調整
    model1.receiveShadow = true;
   
    scene.add(model1);
    console.log("モデル1が正常に読み込まれました。");
  })
  
//   //2個目のオブジェクトを読み込み
  loader.load(
  glbPath2,
  function (gltf) {
    const model2 = gltf.scene; //<-ここの変数を増やす

    // モデルのサイズや位置を調整
    model2.scale.set(0.5, 0.5, 0.5); //モデルの大きさを調整
    model2.rotation.set(0, Math.PI, 0); // モデルの回転を調整
    model2.position.set(-2, 1.5, 0);//モデルの位置を調整
    model2.receiveShadow = true;
    
    scene.add(model2);
    console.log("モデル2が正常に読み込まれました。");
  })

//   //３個目のオブジェクトを読み込み
  loader.load(
  glbPath3,
  function (gltf) {
    const model3 = gltf.scene; //<-ここの変数を増やす

    // モデルのサイズや位置を調整
    model3.scale.set(0.5, 0.5, 0.5); //モデルの大きさを調整
    model3.rotation.set(0, Math.PI, 0); // モデルの回転を調整
    model3.position.set(2, 1.5, 0);//モデルの位置を調整
    model3.receiveShadow = true;
    
    scene.add(model3);
    console.log("モデル3が正常に読み込まれました。");
  })


  //環境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 色、強度
  scene.add(ambientLight);

// 点光源を作成
const light1 = new THREE.PointLight(0xFFFFFF, 2, 5, 1.0);
scene.add(light1);
light1.position.set(-5, 2.8, 0);
light1.castShadow = true;

const light2 = new THREE.PointLight(0xFFFFFF, 2, 5, 1.0);
scene.add(light2);
light2.position.set(0, 2.8, 0);
light2.castShadow = true;

const light3 = new THREE.PointLight(0xFFFFFF, 2, 5, 1.0);
scene.add(light3);
light3.position.set(5, 2.8, 0);
light3.castShadow = true;

// カメラをマウスで操作できるようにする
const controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());

document.addEventListener("click", () =>{
  controls.lock()
})

// キーボードのキーが押されたかチェックする
const keys = {};
document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

// 動く方向と速さのデータ
const direction = new THREE.Vector3();
const velocity = new THREE.Vector3();

// 毎フレーム（60回/秒）動かす関数
function animate() {
 requestAnimationFrame(animate);

 if (controls.isLocked) {
  direction.set(0, 0, 0); // 方向を初期化

 // 押されたキーに応じて方向を設定
 if (keys['KeyS']) direction.z -= 1;
 if (keys['KeyW']) direction.z += 1;
 if (keys['KeyA']) direction.x -= 1;
 if (keys['KeyD']) direction.x += 1;

 direction.normalize(); // 斜めでも速さを一定に

 velocity.copy(direction).multiplyScalar(0.1); // 移動の速さを調整

 // 実際にカメラを動かす
 controls.moveRight(velocity.x);
 controls.moveForward(velocity.z);
 }

  renderer.render(scene, camera);

}

animate();

// ---------- リサイズ対応 ----------
window.addEventListener('resize', () => {
  const { innerWidth, innerHeight } = window;
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});