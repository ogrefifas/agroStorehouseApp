app.controller('StorehouseCtrl', ['$scope','$location','MainService','$stateParams','socket', function($scope,$location,MainService,$stateParams,socket){
	MainService.authorized().
		success(function(){
			$scope.nameError=false;
			getStorehouse();
			getItems();
		})
		.error(function(){
			$location.url('/login');
		});
	function getStorehouse(){
			MainService.user().success(function(data,status){
				if(status===200){
					if(data.role==="admin" || data.role==="moderator"){
						$scope.canEdit=true;
					} 
				}
			});		
			MainService.storehouse($stateParams.id).success(function(data){
				$scope.groups=data;
				$scope.groups=$scope.groups.map(function(item){
					item.countProduct=item.products.length;
					return item;
				})
				$scope.visible=true;
			}).error(function(){
				$location.url('/login')
			})
	}
	$scope.addGroup=function(){
		var data={
			name:this.newGroup.name,
			code:this.newGroup.code,
			storehouse_id:$stateParams.id
		}
		MainService.addGroup(data).success(function(data,status){
			$('.closeModal').click();
			MainService.storehouse($stateParams.id).success(function(data){
				$scope.groups=data;
			}).error(function(){
				$location.url('/login')
			})
		}).error(function(data,status){
			if(status==400){
				$scope.nameError=true;
			}
		})
	}
	$scope.setGroup=function(id){
		$scope.currentGroup=id;
	}
	$scope.deleteGroup=function(id){
		MainService.deleteGroup(id).success(function(data){
			$scope.groups=$scope.groups.filter(function(item){
				return (item.product_group_id===id) ? false : true;
			})
		})
	}
	$scope.deleteProduct=function(id){
		MainService.deleteProduct(id).success(function(data){
			MainService.storehouse($stateParams.id).success(function(data){
				$scope.groups=data;
				$scope.groups=$scope.groups.map(function(item){
					item.countProduct=item.products.length;
					return item;
				})
			}).error(function(){
				$location.url('/login')
			})
		})
	}
	$scope.addProduct=function(id){
		var data={
			name:this.newProduct.name,
			price:this.newProduct.price,
			description:this.newProduct.description,
			group_id:id
		}
		MainService.addProduct(data).success(function(data,status){
			$scope.nameError=false;
			$('.closeModal').click();
			MainService.storehouse($stateParams.id).success(function(data){
				$scope.groups=data;
				$scope.groups=$scope.groups.map(function(item){
					item.countProduct=item.products.length;
					return item;
				})
			}).error(function(){
				$location.url('/login')
			})
		}).error(function(data,status){
			if(status==400){
				$scope.nameError=true;
			}
		})
	}
	function getItems(){
		MainService.getItems().success(function(data){
			$scope.countries=data[0];
			$scope.providers=data[1];
			$scope.consist=data[2];
		})
	}
	$scope.addCountry=function(){
		if(!this.newCountry){
			return;
		}
		MainService.addCountry(this.newCountry).success(function(){
			MainService.getItems().success(function(data){
				$scope.countries=data[0];
				$scope.providers=data[1];
				$scope.consist=data[2];
			})
		})

	}
	$scope.addProvider=function(){
		if(!this.newProvider){
			return;
		}
		MainService.addProvider(this.newProvider).success(function(){
			MainService.getItems().success(function(data){
				$scope.countries=data[0];
				$scope.providers=data[1];
				$scope.consist=data[2];
			})
		})

	}
	$scope.addConsist=function (){
		if(!this.newConsist){
			return;
		}
		MainService.addConsist(this.newConsist).success(function(){
			MainService.getItems().success(function(data){
				$scope.countries=data[0];
				$scope.providers=data[1];
				$scope.consist=data[2];
			})
		})
	}
	$scope.deleteCountry=function(id){
		console.log(id);
		MainService.deleteCountry(id).success(function(){
			MainService.getItems().success(function(data){
				$scope.countries=data[0];
				$scope.providers=data[1];
				$scope.consist=data[2];
			})
		})
	}
	$scope.deleteProvider=function(id){
		MainService.deleteProvider(id).success(function(){
			MainService.getItems().success(function(data){
				$scope.countries=data[0];
				$scope.providers=data[1];
				$scope.consist=data[2];
			})
		})
	}
	$scope.deleteConsist=function(id){
		MainService.deleteConsist(id).success(function(){
			MainService.getItems().success(function(data){
				$scope.countries=data[0];
				$scope.providers=data[1];
				$scope.consist=data[2];
			})
		})
	}
}]);