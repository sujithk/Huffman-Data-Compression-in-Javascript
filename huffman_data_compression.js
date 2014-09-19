codes={}
function frequency(str){
	var freqs={};
	for (var i in str){
		if(freqs[str[i]]==undefined){
		freqs[str[i]]=1;
			}
	else {
		freqs[str[i]]=freqs[str[i]]+1;
			}
	}

	return freqs;
}
//console.log(frequency("aaabccdeeeeeffg"));

function sortfreq(freqs){
	var tuples=[];
  for( var i in freqs){
	tuples.push([freqs[i],i]);
}
   return tuples.sort();
}
w=frequency("aaabccdeeeeeffg");
//console.log(sortfreq(w));

function buildtree(tuples){
	while(tuples.length>1){
		var leasttwo=[tuples[0][1],tuples[1][1]];
		var rest=tuples.slice(2,tuples.length);
		var combfreq=tuples[0][0]+tuples[1][0];
		tuples=rest;
		ext=[combfreq,leasttwo];
		tuples.push(ext);
		tuples.sort();
	}
	return tuples;
}
//console.log(buildtree(sortfreq(w)))

function trimtree(tuples){
	return tuples[0][1];
}
//console.log(trimtree(buildtree(sortfreq(w))))

function assigncodes(node,pat){
	pat=pat || "";
	if (typeof node==typeof ""){
		codes[node]=pat;
	}
	else{
		assigncodes(node[0],pat+"0");
		assigncodes(node[1],pat+"1");
	}
}
tree= trimtree(buildtree(sortfreq(w)))
assigncodes(tree)
//console.log(codes)

function encode(str){
	var output="";
	for(var ch in str){
		output=output+codes[str[ch]];
	}
return output
}
str="aaabccdeeeeeffg"
console.log(encode(str))


function decode(tree,str){
	output="";
	p=tree;
	for (var bit in str){
		if (str[bit]==0){
			p=p[0]
		}
		else{
			p=p[1]
		}
		if (typeof p ==typeof ""){
			output=output+p
			p=tree
		}
	}
	return output
}
console.log(decode(tree,encode(str)))

