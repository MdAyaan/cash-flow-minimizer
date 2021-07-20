 
document.addEventListener("DOMContentLoaded", function(){
  let curr_data;
  const container = document.getElementById("mynetwork");
  const container2 = document.getElementById("mynetwork2");
  const genNew = document.getElementById("generate-graph");
  const solve = document.getElementById("solve");
  const temptext = document.getElementById("temptext");
  const numberOfElementsWrapper = document.querySelector('.wrapper0')
  const numberOfEdgesWrapper = document.querySelector('.wrapper1')
  const inputWrapper = document.querySelector(".wrapper2")
  const numberOfElementsForm= numberOfElementsWrapper.querySelectorAll('.form')
  const numberOfEdgesForm = numberOfEdgesWrapper.querySelectorAll('.form')
  const edgesForm = inputWrapper.querySelectorAll('.form')
  const submitNumberOfElementsInput = numberOfElementsForm[0].querySelector("input[type='submit']")
  const submitNumberOfEdgesInput = numberOfEdgesForm[0].querySelector("input[type='submit']")
  const submitedgesInput = edgesForm[0].querySelector("input[type='submit']")
  
  var m , edgesSubmitCheck = false , n , numberOfEdgesSubmitCheck = false ;

  const options = {
    edges: {
      arrows: {
        to: true, 
      },
      labelHighlightBold: true,
      shadow: {
        enabled: true, 
        size: 5
      },
      font: {
        size: 15,
      },
    },
    nodes: {
      font: "15px arial #5d001e",
      scaling: {
        label: true,
      }, 
      shape: "icon",
      icon: {
        face: "FontAwesome",
        code: "👤",
        size: 32 , 
      },
    },
  };


  let network = new vis.Network(container);
  network.setOptions(options);
  let network2 = new vis.Network(container2);
  network2.setOptions(options);

  function createRandomData() {
    const sz = Math.floor(Math.random() * 10) + 2;
    let nodes = [];
    for (let i = 1; i <= sz; i++) {
      nodes.push({ id: i, label: "Person " + i });
    }
    nodes = new vis.DataSet(nodes);

    const edges = [];
    for (let i = 1; i <= sz; i++) {
      for (let j = i + 1; j <= sz; j++) {
        if (Math.random() > 0.5) {
          if (Math.random() > 0.5)
            edges.push({
              from: i,
              to: j,
              label: String(Math.floor(Math.random() * 100) + 1),
            });
          else
            edges.push({
              from: j,
              to: i,
              label: String(Math.floor(Math.random() * 100) + 1),
            });
        }
      }
    }
    const data = {
      nodes: nodes,
      edges: edges,
    };
    return data;
  }

  genNew.onclick = function () {
    const data = createRandomData();
    curr_data = data;
    network.setData(data);
    temptext.style.display = "block";
    container2.style.display = "none";
  };

  solve.onclick = function () {
    temptext.style.display = "none";
    container2.style.display = "block";
    const solvedData = solveData();
    network2.setData(solvedData);
  };

  function solveData() {
    let data = curr_data;
    const sz = data["nodes"].length;
    const vals = Array(sz).fill(0);
    for (let i = 0; i < data["edges"].length; i++) {
      const edge = data["edges"][i];
      vals[edge["to"] - 1] += parseInt(edge["label"]);
      vals[edge["from"] - 1] -= parseInt(edge["label"]);
    }

    const pos_heap = new BinaryHeap();
    const neg_heap = new BinaryHeap();

    for (let i = 0; i < sz; i++) {
      if (vals[i] > 0) {
        pos_heap.insert([vals[i], i]);
      } else {
        neg_heap.insert([-vals[i], i]);
        vals[i] *= -1;
      }
    }

    const new_edges = [];
    while (!pos_heap.empty() && !neg_heap.empty()) {
      const mx = pos_heap.extractMax();
      const mn = neg_heap.extractMax();

      const amount = Math.min(mx[0], mn[0]);
      const to = mx[1];
      const from = mn[1];

      new_edges.push({
        from: from + 1,
        to: to + 1,
        label: String(Math.abs(amount)),
      });
      vals[to] -= amount;
      vals[from] -= amount;

      if (mx[0] > mn[0]) {
        pos_heap.insert([vals[to], to]);
      } else if (mx[0] < mn[0]) {
        neg_heap.insert([vals[from], from]);
      }
    }

    data = {
      nodes: data["nodes"],
      edges: new_edges,
    };
    return data;
  }


    
  submitNumberOfElementsInput.addEventListener('click', (e) => {
      e.preventDefault(); 
      var x = document.forms["numberOfElements"]["elements"].value;
      if( x < 0 ) {
        alert("Enter Valid Number of Friends" ) ;
        return 
      }
      if( x == "" ) {
          alert("Enter number of friends")
          return
      }
      var formData = new FormData(numberOfElementsForm[0]) 
      n = formData.get("elements")
      numberOfEdgesSubmitCheck = true ; 
      numberOfEdgesWrapper.style.display="block"
      numberOfElementsWrapper.style.display="none"
  });

  submitNumberOfEdgesInput.addEventListener('click', (e) => {
      e.preventDefault(); 
      var x = document.forms["numberOfEdges"]["edges"].value;
      
      if( !numberOfEdgesSubmitCheck ) {
          alert("Enter number of friends")
          return
      }
      if( x == "" ) {
          alert("Enter number of Cash-Flows")
          return
      }
      if( x < 0 ) {
        alert("Enter Valid Number of Cash-Flows")
      }
      var formData = new FormData(numberOfEdgesForm[0]) ;
      m = formData.get("edges") 
      
      for( let i = 1 ; i <= m  ; i++ )  {  
          var firstFriend = document.createElement("select");
          firstFriend.setAttribute( "id", "firstFriend" + i );
          firstFriend.setAttribute( "name", "firstFriend" + i ); 
          var secondFriend = document.createElement("select");
          secondFriend.setAttribute("id", "secondFriend"+i);
          secondFriend.setAttribute("name", "secondFriend"+i);

          for( let j = 1 ; j <= n  ; j++ ) {
              var option = document.createElement("option")
              const optionText = document.createTextNode(j);
              option.appendChild(optionText)
              firstFriend.append(option)  
          }

          for( let j = 1 ; j <= n  ; j++ ) {
              var option = document.createElement("option")
              const optionText = document.createTextNode(j);
              option.appendChild(optionText) 
              secondFriend.append(option)
          }
          let label0 = document.createElement("label");
          label0.setAttribute("for", '"firstFriend"+i' ); 
          label0.textContent = "This Friend "
          $("#edgesInput").append(label0)
          $("#edgesInput").append(firstFriend)
          
          
          let label1 = document.createElement("label");
          label1.setAttribute("for", '"secondFriend"+i' ); 
          label1.textContent = " owes the friend "
          $("#edgesInput").append(label1)
          $("#edgesInput").append(secondFriend)

          var cash = document.createElement("input");
          cash.setAttribute("type", "number");
          cash.setAttribute("id", "cash"+i);
          cash.setAttribute("name", "cash"+i);

          let label2 = document.createElement("label");
          label2.setAttribute("for", '"cash"+i' ); 
          label2.textContent = " Rs. "
          $("#edgesInput").append(label2)
          $("#edgesInput").append(cash)
          var newLine = document.createElement("div")
          newLine.setAttribute("id","newLine"+i)
          newLine.setAttribute("class","break")
          $("#edgesInput").append(newLine) 

          
      }
      edgesSubmitCheck = true ; 
      numberOfEdgesSubmitCheck = false ;
      numberOfEdgesWrapper.style.display="none"
      inputWrapper.style.display="block"
  });

  submitedgesInput.addEventListener('click', (e) => { 
      e.preventDefault(); 
      if( !edgesSubmitCheck ) {
          alert("Enter number of Friends") 
          return
      } 
      var isEmpty = false ;
      for( let i = 1 ; i <= m  ; i++ ) {
          var x = document.forms["edgesInput"]["cash"+i].value; 
          if( x == "" ) {
              isEmpty = true 
              break  
          }
      }
      if( isEmpty ) {
          alert( "Fill all Edges" ) 
          return 
      }
      var formData = new FormData(edgesForm[0]) ;
      
      // Create Data

      let nodes = [];
      for (let i = 1; i <= n; i++) {
        nodes.push({ id: i, label: "Friend " + i });
      }
      nodes = new vis.DataSet(nodes);

      const edges = []
      
      for( let i = 1 ; i <= m ; i++ ) {
        edges.push({
          from: formData.get("firstFriend"+i),
          to: formData.get("secondFriend"+i),
          label: formData.get("cash"+i),
        });  
      }
      
      
      const data = {
        nodes: nodes,
        edges: edges,
      };

      curr_data = data
      network.setData(data);
      temptext.style.display = "block";
      container2.style.display = "none";

      //

      numberOfElementsWrapper.style.display="block"
      inputWrapper.style.display="none"

      document.getElementById("numberOfElements").reset()
      document.getElementById("numberOfEdges").reset()
      document.getElementById("edgesInput").reset()

      edgesSubmitCheck = false;
      deleteEdgesInput()
  })


  function deleteEdgesInput() { 
    for( let i = 1 ; i <= m  ; i++ ) {
        $("#firstFriend"+i).remove(); 
        $("#secondFriend"+i).remove(); 
        $("#cash"+i).remove(); 
        $("#newLine"+i).remove(); 
    }
    $("label").remove()
}

curr_data = createRandomData()
network.setData(curr_data);
temptext.style.display = "block";
container2.style.display = "none"; 

});
