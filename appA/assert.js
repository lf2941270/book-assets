var assert=function(value,msg){
  if(!value){
    throw(msg||(value + " does not equal true"));
  }
}
var assertEqual=function(value1,value2,msg){
  if(value1 !== value2){
    throw(msg||(value1 + " does not equal " + value2));
  }
}
var Class=function(){
  var klass=function(){
    this.init.apply(this,arguments);
  }
  klass.prototype.init=function(){}
  klass.fn=klass.prototype;
  klass.fn.parent=klass;
  klass.extend=function(obj){
    var extended=obj.extended;
    for(var i in obj){
      klass[i]=obj[i];
    }
    if(extended){
      extended(klass);
    }
  }
  klass.include=function(obj){
    var included=obj.included;
    for(var i in obj){
      klass.fn[i]=obj[i];
    }
    if(included){
      included(klass);
    }
  }
  klass.proxy=function(func){
    var self=this;
    return (function(){
      return func.apply(self,arguments);
    });
  }
  klass.fn.proxy=klass.proxy;
  return klass;
}
var Person=new Class;
Person.include({
  a:function(msg){
    alert(msg);
  },
  c:function(msg){
    console.log(msg);
  },
  included:function(klass){
    console.log(klass," was included!");
  }
})
var Button=new Class;
Button.include({
  init:function(element){
    this.element=jQuery(element);
    this.element.click(this.proxy(this.click));
  },
  click:function(){
    alert(1)
  }
});
var a=new Button;
a.init('#ccc');