  (function ()  {
    angular // declares app is an angular application
        .module("BlogApp", []) // see index.html ln 2, app must be declared
        .controller("BlogController", BlogController);

    function BlogController($scope, $http) {
      $scope.createPost = createPost;
      // $scope service is used to be able to interact with html template, send and receives both data and event handlers
      // $http service allows app to communicate between browser and server, requests and responses

      function init() {
        getAllPosts();
      }
      init();

      function getAllPosts() {
        $http
            .get("/api/blogpost");
            // reading blogposts
            .success(function(posts)){
                $scope.posts = posts;
            })
      }
      // function to retrieve the latest blog posts

      function createPost(post) {
      // function above holds an object that contain the title and body
        console.log(post);
        $http.post("/api/blogpost", post);
        // listening to the server, then creating new instances of posts
      }
    }
})();
