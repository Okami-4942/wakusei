
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


// ---------- GLB の読み込み ----------
const loader = new GLTFLoader()

const glbPath1 = "./model/shop.glb"
const glbPath2 = "./model/kasei.glb"

//1個目のオブジェクトを読み込み
loader.load(
  glbPath1,
  function (gltf) {
    const model1 = gltf.scene; //<-ここの変数を増やす
    
    // モデルのサイズや位置を調整
    model1.scale.set(0.5, 0.5, 0.5); //モデルの大きさを調整
    model1.rotation.set(0, Math.PI / 2, 0); // モデルの回転を調整
    // model1.position.set(0, 0, 0);//モデルの位置を調整
   
    scene.add(model1);
    console.log("モデルが正常に読み込まれました。");
  })
  
  //2個目のオブジェクトを読み込み
  loader.load(
  glbPath2,
  function (gltf) {
    const model2 = gltf.scene; //<-ここの変数を増やす

    // モデルのサイズや位置を調整
    model2.scale.set(0.5, 0.5, 0.5); //モデルの大きさを調整
    model2.rotation.set(0, Math.PI, 0); // モデルの回転を調整
    model2.position.set(-2, 1.5, 0);//モデルの位置を調整
    
    scene.add(model2);
    console.log("モデルが正常に読み込まれました。");
  }
  )


// 環境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 色、強度
scene.add(ambientLight);

// 平行光 (太陽光のようなもの)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// カメラをマウスで操作できるようにする
const controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());

// キーボードのキーが押されたかチェックする
const keys = {};
document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

// 動く方向と速さのデータ
const direction = new THREE.Vector3();
const velocity = new THREE.Vector3();

// 毎フレーム（60回/秒）動かす関数
function animate() {
 requestAnimationFrame(animate)};

 if (controls.isLocked) {
  direction.set(0, 0, 0); // 方向を初期化

 // 押されたキーに応じて方向を設定
 if (keys['KeyW']) direction.z -= 1;
 if (keys['KeyS']) direction.z += 1;
 if (keys['KeyA']) direction.x -= 1;
 if (keys['KeyD']) direction.x += 1;

 direction.normalize(); // 斜めでも速さを一定に

 velocity.copy(direction).multiplyScalar(0.1); // 移動の速さを調整

 // 実際にカメラを動かす
 controls.moveRight(velocity.x);
 controls.moveForward(velocity.z);


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