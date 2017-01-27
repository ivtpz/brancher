/* eslint-disable */
const tutorialWindows = [{
  order: 1, 
  xPos: '26%',        
  yPos: '120px', 
  text: 'You can view a visual representation of your tree here by clicking the "Run" button'
}, {
  order: 2, 
  xPos: '60%', 
  yPos: '105px', 
  text: 'The tree you see in the visualizer gets passed into this function as the argument "tree".'
}, {
  order: 3, 
  xPos: '75%', 
  yPos: '105px', 
  text: 'You also have access to the functions "pause", "highlight", and "augment".'
}, {
  order: 4, 
  xPos: '70%', 
  yPos: '150px', 
  text: 'You can define properties for your tree object by adding them to the "Node" class.'
}, {
  order: 5, 
  xPos: '70%', 
  yPos: '178px', 
  text: 'The "Node" class must have a "value" property, and either a "children" or a "left" and a "right" property.'
}, {
  order: 6, 
  xPos: '70%', 
  yPos: '198px', 
  text: 'Use "left" and "right" if you want to create a binary tree, and "children" if you want each node to have an arbitrary number of children.'
}, {
  order: 7, 
  xPos: '70%', 
  yPos: '165px', 
  text: '"Children" must be an array, if you use "left" and "right", they should be Node objects or null.'
}, {
  order: 8, 
  xPos: '72%', 
  yPos: '395px', 
  text: 'Once you have defined your "Node" class, use "augment" to extend the passed in tree object with the functionality of the "Node" class.'
}, {
  order: 9, 
  xPos: '72%', 
  yPos: '395px', 
  text: 'The "augment" function takes in an object and a class, and returns a new object. Each node in the new object will be of the "Node" class.'
}, {
  order: 10, 
  xPos: '72%', 
  yPos: '395px', 
  text: 'Now you can call the methods defined on "Node" on the passed in tree object.'
}, {
  order: 11, 
  xPos: '72%', 
  yPos: '280px',
  text: 'When traverse gets called, it passes each node to highlight in order.'
}, {
  order: 12, 
  xPos: '72%', 
  yPos: '280px', 
  text: 'Highlight will cause whatever node it is passed to turn red temporarily.'
}, {
  order: 13, 
  xPos: '72%', 
  yPos: '280px',
  text: 'This allows you to see the order that a function traverses through your tree.'
}, {
  order: 14, 
  xPos: '70%', 
  yPos: '445px', 
  text: 'The pause function takes in a tree, and puts it onto the visualizer temporarily.'
}, {
  order: 15, 
  xPos: '70%', 
  yPos: '445px', 
  text: 'By calling pause and passing it "newTree" we can see the tree in-between adding nodes.'
}, {
  order: 16, 
  xPos: '48%', 
  yPos: '70px', 
  text: 'You can control the speed of animation for highlighting and viewing tree states here.'
}, {
  order: 17, 
  xPos: '48%', 
  yPos: '70px', 
  text: 'Warning: calling highlight on a large tree (30+ nodes) can run slowly.'
}, {
  order: 18, 
  xPos: '10%', 
  yPos: '80px', 
  text: 'You can also move backwards and forwards through your visualizations here, up to 20 steps'
}, {
  order: 19, 
  xPos: '68%', 
  yPos: '515px', 
  text: 'Finally, you should return a tree from this function. Whatever you return will end up in the visualizer.'
}, {
  order: 20, 
  xPos: '68%', 
  yPos: '300px', 
  text: 'Edit the code to create your own tree...'
}, {
  order: 21, 
  xPos: '83%', 
  yPos: '70px', 
  text: '...then click "Run" to see it in action.'
}]

export default tutorialWindows;