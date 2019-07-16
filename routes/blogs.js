const express = require('express')
const blogController=require('./../controller/blogController')
const appConfig=require('../config/appConfig')
const example=require('./../middleware/example')
const auth=require('./../middleware/auth')


let setRouter=(app) => {
let baseUrl=appConfig.apiVersion+'/blogs';

app.post(baseUrl+'/:blogId/delete',auth.isAuthenticated,blogController.removeblog)

    /**
     * @api {post} /api/v1/blogs/:blogId/delete Delete Blog by blogId
     * @apiVersion 0.0.1
     * @apiGroup delete
     * 
     * @apiParam {String} authToken The token for authentication.(send authToken as query parameter)
     * @apiParam {String} blogId blogId of the blog passed as a URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"Blog Deleted successfully",
     *   "status":200,
     *   "data": []  
     *  }
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured",
     *      "status":500,
     *      "data":null
     *    }
     */


app.get(baseUrl+'/:blogId/views/count',auth.isAuthenticated,blogController.editbloga)
     
    /**
     * @api {get} /api/v1/blogs/:blogId/views/count Increase Blogs Count
     * @apiVersion 0.0.1
     * @apiGroup update
     * 
     * @apiParam {String} authToken The token for authentication.(send authToken as query parameter)
     * @apiParam {String} blogId blogId of the blog passed as a URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"Blog updated successfully",
     *   "status":200,
     *   "data": [
     *               {
     *                   blogId:"string",
     *                   title:"string",
     *                   description:"string",
     *                   bodyHtml:"string",
     *                   views:number,
     *                   isPublished:boolean,
     *                   category:"string",
     *                   author:"string",
     *                   tage:object(type = array)
     *                   created:"date",
     *                   lastModified:"date"
     *               }
     *            ]  
     *  }
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured",
     *      "status":500,
     *      "data":null
     *    }
     */


app.put(baseUrl+'/:blogId/edit',auth.isAuthenticated,blogController.editblog)
   
     /**
     * @api {put} /api/v1/blogs/:blogId Edit The blog
     * @apiVersion 0.0.1
     * @apiGroup edit
     * 
     * @apiParam {String} authToken The token for authentication.(send authToken as query parameter)
     * @apiParam {String} blogId blogId of the blog passed as a URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"Blog Edited successfully",
     *   "status":200,
     *   "data": [
     *               {
     *                   blogId:"string",
     *                   title:"string",
     *                   description:"string",
     *                   bodyHtml:"string",
     *                   views:number,
     *                   isPublished:boolean,
     *                   category:"string",
     *                   author:"string",
     *                   tage:object(type = array)
     *                   created:"date",
     *                    lastModified:"date"
     *               }
     *            ]  
     *  }
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured",
     *      "status":500,
     *      "data":null
     *    }
     */


app.get(baseUrl+'/view/byauthor/:author',auth.isAuthenticated,blogController.getauthor)
     
     /**
     * @api {get} /api/v1/blogs/view/byauthor/:author get blogs by author
     * @apiVersion 0.0.1
     * @apiGroup read
     * 
     * @apiParam {String} authToken The token for authentication.(send authToken as query parameter)
     * @apiParam {String} blogId blogId of the blog passed as a URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"Blog Found successfully",
     *   "status":200,
     *   "data": [
     *               {
     *                   blogId:"string",
     *                   title:"string",
     *                   description:"string",
     *                   bodyHtml:"string",
     *                   views:number,
     *                   isPublished:boolean,
     *                   category:"string",
     *                   author:"string",
     *                   tage:object(type = array)
     *                   created:"date",
     *                    lastModified:"date"
     *               }
     *            ]  
     *  }
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured",
     *      "status":500,
     *      "data":null
     *    }
     */


app.get(baseUrl+'/view/:blogId',auth.isAuthenticated,blogController.getSingleBlog)
     
     /**
     * @api {get} /api/v1/blogs/view/:blogId get a single blog
     * @apiVersion 0.0.1
     * @apiGroup read
     * 
     * @apiParam {String} authToken The token for authentication.(send authToken as query parameter)
     * @apiParam {String} blogId blogId of the blog passed as a URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"Blog Found successfully",
     *   "status":200,
     *   "data": [
     *               {
     *                   blogId:"string",
     *                   title:"string",
     *                   description:"string",
     *                   bodyHtml:"string",
     *                   views:number,
     *                   isPublished:boolean,
     *                   category:"string",
     *                   author:"string",
     *                   tage:object(type = array)
     *                   created:"date",
     *                    lastModified:"date"
     *               }
     *            ]  
     *  }
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured",
     *      "status":500,
     *      "data":null
     *    }
     */


app.get(baseUrl+"/all",blogController.getALLBlogs)

     /**
     * @api {get} /api/v1/blogs/all getAllBlogs
     * @apiVersion 0.0.1
     * @apiGroup read
     * 
     * @apiParam {String} authToken The token for authentication.(send authToken as query parameter)
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"All Blogs Details Found",
     *   "status":200,
     *   "data": [
     *               {
     *                   blogId:"string",
     *                   title:"string",
     *                   description:"string",
     *                   bodyHtml:"string",
     *                   views:number,
     *                   isPublished:boolean,
     *                   category:"string",
     *                   author:"string",
     *                   tage:object(type = array)
     *                   created:"date",
     *                   lastModified:"date"
     *               }
     *            ]  
     *  }
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured",
     *      "status":500,
     *      "data":null
     *    }
     */


app.post(baseUrl+'/create',auth.isAuthenticated,blogController.createblog)

    /**
     * @api {post} /api/v1/blogs/create Create blog
     * @apiVersion 0.0.1
     * @apiGroup create
     * 
     * @apiParam {String} authToken The token for authentication.(send authToken as query parameter)
     * @apiParam {String} title title of the blog passed as a body parameter
     * @apiParam {string} description description of the blog passed as a body parameter
     * @apiParam {String} blogBody blogBody of the blog passed as a body parameter
     * @apiParam {String} category category of the blog passed as a body parameter
     * @apiParam {String} fullName author of the body passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
     *   "error":false,
     *   "message":"Blog Created successfully",
     *   "status":200,
     *   "data": [
     *               {
     *                   blogId:"string",
     *                   title:"string",
     *                   description:"string",
     *                   bodyHtml:"string",
     *                   views:number,
     *                   isPublished:boolean,
     *                   category:"string",
     *                   author:"string",
     *                   tage:object(type = array)
     *                   created:"date",
     *                   lastModified:"date"
     *               }
     *            ]  
     *  }
     *   @apiErrorExample {json} Error-Response:
     *    {
     *      "error":true,
     *      "message":"Error Occured",
     *      "status":500,
     *      "data":null
     *    }
     */


}//end setRouter function

module.exports={
    setRouter:setRouter
}