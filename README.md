# Data Visualization of the Top 95 Grossing Movies using a Treemap Diagram

A basic structure of the code is a follow along from [this](https://www.youtube.com/watch?v=wvfBn7GCCHk) youtube video. 


How the json data is formatted:

```
.
├── movies
│   ├── name                    //(:movies)
│   └── children                //contains array of objects
│       ├── name                //(:Action/Adventure/etc.)
│       └── children            //contains array of objects
│           ├── name            //(:movieName)
│           ├── category        //(:Action/Adventure/etc.)
│           └── value           //(:integer)

```



[Link](https://rajdeepdev10.github.io/treemap-diagram) to Github Pages

### Concepts

- `d3.hierarchy()` 
- `d3.treemap()`
- `node.leaves()`

The treemap CSS needs improvement