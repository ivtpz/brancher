/* eslint-disable */
const tutorialWindows = [{
  xPos: '26%',
  yPos: '120px',
  text: 'You can view a visual representation of your tree here by clicking the "Run" button'
}, {
  xPos: '71%',
  yPos: '105px',
  text: 'You have access to the functions "pause", and "highlight".'
},  {
  xPos: '46%',
  yPos: '415px',
  text: 'The pause function takes in a tree, and puts it onto the visualizer temporarily.'
}, {
  xPos: '46%',
  yPos: '415px',
  text: 'By calling pause and passing it "newTree" we can see the tree in-between adding nodes.'
}, {
  xPos: '46%',
  yPos: '485px',
  text: 'Once you have passed a new tree to the "pause" function, you can then call "highlight" on the nodes of that new tree.'
}, {
  xPos: '46%',
  yPos: '280px',
  text: 'When traverse gets called, it passes each node to highlight in order.'
}, {
  xPos: '46%',
  yPos: '280px',
  text: 'Highlight will cause whatever node it is passed to turn red temporarily.'
}, {
  xPos: '46%',
  yPos: '280px',
  text: 'This allows you to see the order that a function traverses through your tree.'
}, {
  xPos: '36%',
  yPos: '70px',
  text: 'You can control the speed of animation for highlighting and viewing tree states here.'
}, {
  xPos: '36%',
  yPos: '70px',
  text: 'Warning: calling highlight on a large tree (30+ nodes) can run slowly.'
}, {
  xPos: '12%',
  yPos: '80px',
  text: 'You can also move backwards and forwards through your visualizations here, up to 20 steps'
}, {
  xPos: '45%',
  yPos: '100px',
  text: 'You can define properties for your tree object by adding them to the "Node" class.'
}, {
  xPos: '45%',
  yPos: '100px',
  text: 'The "Node" class must have a "value" property, and either a "children" or a "left" and a "right" property.'
}, {
  xPos: '45%',
  yPos: '100px',
  text: 'Use "left" and "right" if you want to create a binary tree, and "children" if you want each node to have an arbitrary number of children.'
}, {
  xPos: '45%',
  yPos: '100px',
  text: '"Children" must be an array. If you use "left" and "right", they should be Node objects or null.'
}, {
  xPos: '70%',
  yPos: '600px',
  text: 'You can swap to starter code for a binary tree by clicking "Switch to Binary".'
}, {
  xPos: '81%',
  yPos: '505px',
  text: 'Finally, you should return a tree from this function. Whatever you return will end up in the visualizer.'
}, {
  xPos: '68%',
  yPos: '300px',
  text: 'Edit the code to create your own tree...'
}, {
  xPos: '83%',
  yPos: '70px',
  text: '...then click "Run" to see it in action.'
}, {
  xPos: '65%',
  yPos: '450px',
  text: 'As an initial challenge, try to add more nodes to "newTree"...'
}, {
  xPos: '68%',
  yPos: '300px',
  text: '...then refactor traverse to do a Breadth First traversal of the tree.'
}]

export default tutorialWindows;
