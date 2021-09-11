import {Component, EventEmitter, OnInit} from '@angular/core';
// @ts-ignore
import * as Ogma from 'src/assets/ogma.min.js';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
export interface nodeData
{
  [key:string]: any,
  type: string,
  name: string,
  Command : string ,
  _statements? : nodeData[] ,
  _field? : string ,
  _value? : string
}
type ProviderKey="_field" | "type" | "name";
@Component({
  selector: 'app-filtering-tree',
  templateUrl: './filtering-tree.component.html',
  styleUrls: ['./filtering-tree.component.scss']
})
export class FilteringTreeComponent implements OnInit {

  public ogma: Ogma;
  public form!: FormGroup;
  public nodeSize: number = 0;
  public currentData!: nodeData | null;
  public onSaveGraph = new EventEmitter();
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Command: [null, Validators.required],
      _field: [null, [Validators.required]],
      _value: [null, Validators.required],
    });
    this.ogma = new Ogma({
      container: 'graph-container',
      options: {
        interactions: {zoom: {onDoubleClick: true}}
      }
    });

    this.ogma.styles.addNodeRule({
      text: {
        maxLineLength: 140, // truncate
        size: 12,
        color: 'black',
        minVisibleSize: 2,
        content: (n: any) => n.getData('name')
      }
    });
    this.ogma.styles.addEdgeRule({
      shape: 'arrow'
    });

    this.ogma.addNode({ id: 1, data : {type : 'parent' , name : '1' , Command : 'AND' ,  _statements : [] } ,  attributes: { x: 0, y: 0, color: 'green' } });
    // this.ogma.addNodes([
    //   { id: 2 ,data  : {type : 'child' , name : '2'} , attributes: { x: 60, y: 20, color: 'magenta' } },
    //   { id: 3 ,data  : {type : 'child' , name : '3'} , attributes: { x: 30, y: -30, color: 'orange' } }
    // ]);
    this.nodeSize = this.ogma.getNodes().size;

    this.ogma.events.onKeyPress(46, () => {
      let selectedNodes = this.ogma.getSelectedNodes();
      let selectedEdges = this.ogma.getSelectedEdges();
      this.nodeSize -= selectedNodes.size;
      this.nodeSize -= selectedNodes.size;
      this.ogma.removeNodes(selectedNodes.getId())
      this.ogma.removeEdges(selectedEdges.getId())
      this.currentData = null;
      // console.log('nodes : ', this.ogma.getSelectedNodes().getId());
    });

    this.ogma.events.onClick((evt: any) => {
      const button = evt.button,
        target = evt.target;

      if (!target) {
        this.ogma.clearSelection();
        this.currentData = null;
      } else if (button === 'left') {
        this.ogma.clearSelection();
        target.setSelected(true);
        if (target.isNode) {
          this.currentData = this.ogma.getNode(target.getId()).getData();
          console.log(this.currentData);
        }
      } else if (button === 'right') {
        target.setSelected(true);
      }
    });

    // ogma.addEdges([
    //   { id: 2, source: 1, target: 2 , data : {source : 1} },
    // ]);
    // ogma.view.locateGraph();

    this.ogma.events.onDragStart(() => {
      if (this.ogma.keyboard.isKeyPressed('ctrl')) {
        this.ogma.tools.connectNodes.enable({
          strokeColor: 'red',

          condition: (source: any, target: any) => {
            const edgeList = this.ogma.getEdges();
            for (let i = 0; i < edgeList.size; i++) {
              const edgeData = edgeList.get(i).getData();
              if (edgeData.source == source.getId() && edgeData.target == target.getId())
                return false;
            }
            return (source.getData().type != 'child') && (source.getId()!= target.getId());

          },
          // @ts-ignore
          createNodes: Boolean = false,

          createEdge: (e: any) => {
            e.attributes = {...e.attributes, color: 'orange'};
            return e;
          },
          onComplete: (source: any, target: any, edge: any) => {
            if (!target || !edge) {
              this.ogma.tools.connectNodes.disable();
              console.log(this.ogma.getEdges().size);
            } else {
              edge.setData({source: source.getId(), target: target.getId()});
              source.getData('_statements').push(target.getData());
              // console.log(source.getId(), target.getId(), edge.getId());
            }
          }
        });
      }
    });
    this.ogma.events.onDragEnd(() => {
      if (this.ogma.algorithms.detectCycle())
        this.ogma.removeEdge(this.ogma.getEdges().get(this.ogma.getEdges().size - 1).getId());
    })
  }

  handleAddNode(condition: string): void {
    switch (condition) {
      case 'AND': {
        this.ogma.addNode({
          id: ++this.nodeSize,
          data: {type: 'parent', name: 'AND', Command : 'AND' , _statements : [] },
          attributes: {x: 0, y: 0, color: 'green'}
        });
        break;
      }
      case 'OR' : {
        this.ogma.addNode({
          id: ++this.nodeSize,
          data: {type: 'parent', name: 'OR' , Command : 'OR',  _statements : [] },
          attributes: {x: 0, y: 0, color: 'magenta'}
        });
        break;
      }
      case 'condition': {
        this.ogma.addNode({
          id: ++this.nodeSize,
          data: {...{type: 'child', name: 'condition'}, ...this.form.value},
          attributes: {x: 0, y: 0, color: 'orange'}
        });
        this.ogma.getNodes().forEach((node: any) => {
          // do something with the node
          // console.log(node.getData());
        });
        break;
      }
    }
  }

  handleSavingGraph()
  {
    let inDegrees = this.ogma.getNodes().getDegree('in');
    const rootNodesNumber = inDegrees.filter((elem: number) => elem === 0 ).length;
    if(rootNodesNumber !== 1 )
    {
      alert('خطا در ذخیره سازی : گراف فقط یک ریشه باید داشته باشد');
    }
    else {
      const nodeObjs  = this.ogma.getNode(1).getAdjacentNodes(); // just out nodes
      alert(nodeObjs.size);
      this.deleteSpecefickKey(this.ogma.getNode(1).getData()  , 'name');
      var serialized = JSON.stringify(this.ogma.getNode(1).getData() , undefined , 1 );
      console.log(serialized);
      alert('فیلتر با موفقیت ذخیره شد');
      this.onSaveGraph.emit();
    }
  }
  deleteSpecefickKey(object : any , key : ProviderKey  ) : void
  {
    if (object.length!=undefined)
    {
      for(let child of object)
      {
        this.deleteSpecefickKey(child , key);
      }
    }
    else
    {
      if (key in object)
      {
        delete object[key];
        delete object.type; // delete type also
        for (let v of Object.values(object))
        {
          // console.log(v)
          if (v instanceof Object)
            this.deleteSpecefickKey(v, key)
        }
      }
    }
    // console.log("inner obj")
    //  console.log(object)

  }
}
