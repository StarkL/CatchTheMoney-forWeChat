window.onload = function() {
	var bg = document.getElementById('bg');
	var box = document.getElementById('box');
	var total = document.querySelector('.total');
	var localTime = document.querySelector('.localTime');
	var num = document.getElementById('num');
	var totalEnd = document.getElementById('totalEnd');
	var hb, beforeX, afterX, timeCountS, imgName0, time0, time5, time10, time15, step0, hongbao0, played, fingerLeft, fingerRight;
	var start = document.querySelector('.start');
	var startEnd = document.querySelector('.startEnd');
	var startEnd2 = document.querySelector('.startEnd2');
	var overSum = document.querySelector('.over-sum');
	var overAgain = document.querySelector('.over-again');
	var light = document.querySelector('.light');
	var hbBg = document.querySelector('.bg-hb');
	var endControl = true;
	var winHeight = document.documentElement.clientHeight;
	var uufoot = document.getElementsByClassName('uufoot')[0];
	var uuleft = document.getElementsByClassName('uuleft')[0];
	var uuright = document.getElementsByClassName('uuright')[0];
	var beforeX = 0;
	var sum = 0;
	var moving = false;
	var secon = 0;
	var minut = 0;
	var mi = document.getElementsByClassName('minutess')[0];
	var se = document.getElementsByClassName('secondss')[0];
	var catched = 0;
	var missed = 0;

	//	————触屏开始游戏————
	start.onclick = function() {
		if(fingerLeft) {
			clearInterval(fingerLeft);
		} else if(fingerRight) {
			clearInterval(fingerRight);
		}
		this.style.display = 'none';
		total.style.display = 'block';
		localTime.style.display = 'block';
		box.style.display = 'block';
		begin();
		timeCount();
	}
	var overOuter = document.querySelector('.over-outer');
	var overGethongbao = document.querySelector('.over-gethongbao');
	var overTomenu = document.querySelector('.over-toMenu');
	var againChoose = document.querySelector('.again-choose');
	var againTomorrow = document.querySelector('.again-tomorrow');
	//	————点击领取红包————
	overGethongbao.addEventListener('touchstart', function() {
		alert('成绩已提交！')
	})
	overGethongbao.onclick = function() {}
		//	————点击回主菜单————
	overTomenu.addEventListener('touchstart', function() {
		alert('这里添加返回主菜单的链接');
	});
	//	————点击分享给好友1————
	var overShare2 = document.querySelector('.over-share2');
	var share2Share = document.querySelector('.share2-share');
	var share2Shade = document.querySelector('.share2-shade');
	overShare2.addEventListener('touchend', function(ev) {
		overOuter.style.display = 'none';
		share2Share.style.display = 'block';
		share2Shade.style.display = 'block';
	})
	share2Shade.addEventListener('touchend', function() {
			share2Share.style.display = 'none';
			share2Shade.style.display = 'none';
			overOuter.style.display = 'block';
			againChoose.style.display = 'none';
	})

	function begin() {
//		light.style.left = box.offsetLeft / winHeight * 179 - 6 + '%';
		bg.appendChild(light);
		//控制台启动
		control2();

		//———————————UU操控touch事件开始—————————————
		bg.addEventListener('touchstart', function(ev) {
			box.style.background = "url(img/UU.png) no-repeat";
			box.style.backgroundSize = "100%";
			uufoot.style.display = 'block';
			uuleft.style.display = 'block';
			uuright.style.display = 'block';
			
//			uuleft.style.left = box.offsetLeft - 40 + 'px';
//			uuright.style.left = box.offsetLeft + box.offsetWidth - 10 + 'px';
		}, false);

		bg.addEventListener('touchmove', function(ev) {
			//		————————优优 探照灯移动操控开始————————
			moving = true;
			var bLeft = (event.changedTouches[0].clientX-50)/100.74;
			if(bLeft < 0) {
				bLeft = 0;
			} else if(bLeft > 2.7) {
				bLeft = 2.7
			}
			//		优优控制
			var boxLeft = box.style.transform;
//			beforeX = box.style.transform;
//			var sliceStart = boxLeft.indexOf('d(')+2;
//			var sliceEnd = boxLeft.indexOf('rem');
//			beforeX = box.style.transform.slice(sliceStart,sliceEnd);
			beforeX = sli1(boxLeft,box.style.transform);
//			box.style.left = event.changedTouches[0].clientX / winHeight * 100 * 100 / 55 - 15 + '%';
			box.style.transform = 'translate3d('+bLeft+'rem,260%,0)';
			afterX = sli1(boxLeft,box.style.transform);
//			afterX = parseFloat(box.style.left).toFixed(2);

			//		探照灯控制
			light.style.transform = 'translate3d(1.04rem, -127%, 0px) skew('+(beforeX*11.74-15.5)+'deg,0deg)';
//			light.style.transform = 'skew(' + ((box.offsetLeft / bg.offsetWidth - 0.36) * 135 / 3.42 - 1.6) + 'deg,0deg)';

			//		优优跑步脚步控制
//			uufoot.style.left = event.changedTouches[0].clientX / winHeight * 100 * 100 / 55 - 7.5 + '%';
			uufoot.style.transform = 'translate3d('+(bLeft-1.5)+'rem,-0.05rem,0)';
			if(parseFloat(uufoot.style.left) < 7) {
				uufoot.style.left = '7%';
			}
			if(parseFloat(uufoot.style.left) > 80) {
				uufoot.style.left = '80%';
			}

			//		优优左侧气体控制
			if(afterX - beforeX > 0) {
				uuleft.style.display = 'block';
				uuright.style.display = 'none';
				uuleft.style.transform = 'translate3d('+(bLeft-0.60)+'rem,1240%,0)';
//				uuleft.style.left = event.changedTouches[0].clientX / winHeight * 100 * 100 / 55 - 23 + '%';
			}

			//		优优右侧气体控制
			if(afterX - beforeX < 0) {
				uuleft.style.display = 'none';
				uuright.style.display = 'block';
				uuright.style.transform = 'translate3d('+(bLeft+1)+'rem,1280%,0)';
//				uuright.style.left = event.changedTouches[0].clientX / winHeight * 100 * 100 / 55 + 6 + '%';
				
			}

		}, false);
		bg.addEventListener('touchend', function(ev) {
				moving = false;
				uuleft.style.display = 'none';
				uuright.style.display = 'none';
			})
			//———————————touch事件结束—————————————

		/*————控制台2————*/
		function control2() {
			step0 = 0.08;
			imgName0 = ran(10, 13);
			hongbao0 = new hongbao(imgName0, step0, 20, 1000)
			time0 = setInterval(function() {
				imgName0 = ran(10, 13); //无炸弹
				hongbao0 = new hongbao(imgName0, step0, 20);
			}, 1000);
			setTimeout(function() {
				clearInterval(time0);
				step0 = 0.1;
				time5 = setInterval(function() {
					imgName0 = ran(10, 13); //1：10
					hongbao0 = new hongbao(imgName0, step0, 20);
				}, 600)
			}, 5000);
			setTimeout(function() {
				clearInterval(time5);
				step0 = 0.12;
				time10 = setInterval(function() {
					imgName0 = ran(9, 13); //1：5
					hongbao0 = new hongbao(imgName0, step0, 20);
				}, 400)
			}, 10000);
			setTimeout(function() {
				clearInterval(time10);
				step0 = 0.14;
				time15 = setInterval(function() {
					imgName0 = ran(8, 15); //1：1
					hongbao0 = new hongbao(imgName0, step0, 20);
				}, 300)
			}, 15000);
		}

		//	———————————————————封装红包方法开始——————————————————————————
		function hongbao(imgName, step, intervalTime) {
			sum += 0;
			if(endControl) {
				//			1.创建红包
				var hb = document.createElement('img');
				hb.src = 'img/hb' + imgName + '.png';
				hb.style.width = '0.77rem';
				//			hb.style.top = 0;
				//			hb.style.left = ran(0,bg.offsetWidth-65)+'px';
//				var hbLeft = ran(0, 272) / 100;
				var hbLeft = ran(0,300)/100;
				//			hb.style.transform = 'translate3d('+hbLeft+'rem,0,0.01rem)';
				hb.style.transform = 'translate3d(' + hbLeft + 'rem,0,0rem)';
				hb.className = 'hb';
				hbBg.appendChild(hb);
				//			让红包飞
					var hbTops=0;
				hb.timer = setInterval(function() {
					hbTops += step;
//					console.log(hbTops/10);
//					hb.style.top = hb.offsetTop + step + 'px';
					hb.style.transform = 'translate3d(' + hbLeft + 'rem,'+(hbTops*200)+'%,0rem)'
//					console.log(hb.style.transform);
					//				红包超出边界则清除红包和定时器
//					var sliceStart2 = hb.style.transform.indexOf('rem')+4;
//					var sliceEnd2 = hb.style.transform.indexOf('%');
					var HbTop = sli2(hb.style.transform,hb.style.transform);
					//				如果漏接5个红包,则停止游戏
					if(HbTop > 700) {
						if(imgName == 7 || imgName == 8 || imgName == 9 || imgName == 10 || imgName == 1) {
							missed++;
						}
						clearInterval(hb.timer);
						hbBg.removeChild(hb);
					}
					//				如果丢失红包超过missedNum,则停止游戏记分
					if(missed > 5) {
						endControl = false;
						clearInterval(time15);
						clearInterval(timeCountS);
						clearInterval(hb.timer);
						overSum.innerHTML = sum.toFixed(2);
						startEnd.style.display = 'block';
						startEnd2.style.display = 'block';
					}
					//				碰撞检测
//					var hminLeft = hb.offsetLeft;
//					var hmaxLeft = hb.offsetLeft + hb.offsetWidth;
//					var hTop = hb.offsetTop + hb.offsetHeight;
//					var bminLeft = box.offsetLeft;
//					var bmaxLeft = box.offsetLeft + box.offsetWidth;
//					var bTop = box.offsetTop;
					var hminLeft = sli1(hb.style.transform,hb.style.transform);
					var hmaxLeft = parseFloat(sli1(hb.style.transform,hb.style.transform))+parseFloat(hb.style.width);
//					console.log(hmaxLeft);
					var hTop = sli2(hb.style.transform,hb.style.transform);
					var bminLeft = sli1(box.style.transform,box.style.transform);
					var bmaxLeft = parseFloat(sli1(box.style.transform,box.style.transform))+0.975;
					var bTop = sli2(box.style.transform,box.style.transform);
//					console.log(bmaxLeft-0.3);

					if(hTop > 390 && hTop < 430 && (hminLeft)>(bminLeft-0.3) && (hmaxLeft) < (bmaxLeft+0.3)) {
						//					————如果接到炸弹————
						if(imgName == '1' || imgName == '12' || imgName == '13' || imgName == '14' || imgName == '15' || imgName == '16') {
							endControl = false;
							clearInterval(timeCountS);
							clearInterval(time15);
							clearInterval(hb.timer);
							var boom = document.createElement('img');
							boom.src = 'img/boom.png';
							boom.style.width = '25%';
							boom.style.transform = hb.style.transform;
							hbBg.replaceChild(boom, hb);
							
							setTimeout(function() {
								hbBg.removeChild(boom);
							}, 1000);
							//						————UU哭1个疗程的————
							box.style.background = "url(img/UU-cry.png) no-repeat";
							box.style.backgroundSize = "100%";
							//						uufoot.style.display = 'none';
							//						————弹出游戏结束界面————
							setTimeout(function() {
									overSum.innerHTML = sum.toFixed(2);
									startEnd.style.display = 'block';
									startEnd2.style.display = 'block';
								}, 500)
								//						————清除游戏计时的定时器————
							clearInterval(timeCountS);
						}
						//					————如果接到红包————
						if(!(imgName == '1' || imgName == '12' || imgName == '13' || imgName == '14' || imgName == '15' || imgName == '16')) {
							if(endControl) {
								catched++;
								if(imgName == 2 || imgName == 11) {
									jifen = 0.01
								};
								if(imgName == 3 || imgName == 10) {
									jifen = 0.05
								};
								if(imgName == 4 || imgName == 9) {
									jifen = 0.10
								};
								if(imgName == 5 || imgName == 8) {
									jifen = 0.50
								};
								if(imgName == 6 || imgName == 7) {
									jifen = 1.00
								};
								//							————显示加分————
								var yes = document.createElement('div');
								yes.innerHTML = '+' + jifen;
								yes.style.transform = hb.style.transform;
								var yesTop = sli2(hb.style.transform,hb.style.transform);
								var hbStyle = hb.style.transform;
								
								yes.className = 'yes';
								var yesYuan = document.createElement('span');
								yesYuan.className = 'yes-yuan';
								yesYuan.innerHTML = ' 元'
								yes.appendChild(yesYuan);
								hbBg.removeChild(hb);
								setTimeout(function() {
										hbBg.removeChild(yes);
									}, 500)
									//							————记分开始————
									//			初始化金额
								num.innerHTML = sum.toFixed(2);
								sum += jifen;
								num.innerHTML = sum.toFixed(2);
							} else {
								bg.removeChild(hb);
							}
						}
					}
				}, intervalTime);
			}
		};
		//	———————————————————封装红包方法结束——————————————————————————

		//				随机函数
		function ran(m, n) {
			return Math.ceil(Math.random() * 10000) % (n - m + 1) + m;
		}
	}

	function initGame() {
		sum = 0;
		missed = 0;
		catched = 0;
		step0 = 0.08;
		se.innerHTML = '00';
		mi.innerHTML = '00';
		clearInterval(time0);
		clearInterval(time5);
		clearInterval(time10);
		clearInterval(time15);
	}
	//	————开始界面 手指移动————
	var finger = document.querySelector('.finger');
	var fingerA = 1;

	function fingerRun() {
		if(fingerA == 1) {
			fingerLeft = setInterval(function() {
				finger.style.left = finger.offsetLeft / bg.offsetWidth * 100 - 1.5 + '%';
				if(finger.offsetLeft / bg.offsetWidth < 0.28) {
					fingerA = 2;
					clearInterval(fingerLeft);
				}
				if(fingerA == 2) {
					fingerRight = setInterval(function() {
						finger.style.left = finger.offsetLeft / bg.offsetWidth * 100 + 1.5 + '%';
						if(finger.offsetLeft / bg.offsetWidth > 0.60) {
							fingerA = 1;
							clearInterval(fingerRight);
						}
						fingerRun();
					}, 20)
				}
			}, 20)
		}
	};
	fingerRun();
	//	————计时器————
	function timeCount() {
		timeCountS = setInterval(function() {
			secon += 10;
			if(secon > 999) {
				secon = 0;
				minut += 1;
			}
			if(minut > 60) {
				minut = 0;
			}
			se.innerHTML = toTwo(secon / 10);
			mi.innerHTML = toTwo(minut);
		}, 10)

		function toTwo(num) {
			if(num < 10) {
				num = '0' + num;
			}
			return num;
		}
	}
	overAgain.onclick = function(){
//		location.reload();
//		history.go(0);
//		location=location;
		window.location.reload();
	}
	function sli1(a,b){
		var sliceStart = a.indexOf('d(')+2;
		var sliceEnd = a.indexOf('rem');
		return b.slice(sliceStart,sliceEnd);
	}
	function sli2(a,b){
		var sliceStart2 = a.indexOf('rem')+4;
		var sliceEnd2 = a.indexOf('%');
		return b.slice(sliceStart2,sliceEnd2);
	}
	//		——————————————————————————
}