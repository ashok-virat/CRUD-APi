const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')

const blog = require('../models/blog')
const BlogModel = mongoose.model('Blog')

const response = require('./../libs/responseLib')
const time = require('./../libs/timeLib')
const check = require('./../libs/checkLib')
const logger = require('./../libs/loggerLib')

//get all blogs
let getALLBlogs = (req, res) => {
    BlogModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.captureError(`error occured:${err}`, 'Blog Controller:getAllBlog', 10)
                let apiResponse = response.generate(true, 'Failed To Find Blog Details', 500, null);
                res.send(apiResponse)
            }
            else if (check.isEmpty(result)) {
                logger.captureError('No Blog Is Found', 'Blog Controller:getAllBlogs', 10)
                let apiResponse = response.generate(true, 'No Blog Found', 404, null)
                res.send(apiResponse)
            }
            else {
                logger.captureInfo('Blogs Is found', 'Blog Controller:getAllBlogs', 10)
                let apiResponse = response.generate(false, 'All Blogs Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}
//end get all blogs





//get single blog
let getSingleBlog = (req, res) => {
    console.log(req.users)
    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {
        if (err) {
            logger.captureError(`error occured:${err}`, 'Blog Controller:getSingleBlog', 8)
            let apiResponse = response.generate(true, 'No Blog Is Found', 500, null)
            res.send(apiResponse)
        }
        else if (check.isEmpty(result)) {
            logger.captureError('No Blog Is Found', 'Blog Controller:getSingleBlog', 8)
            let apiResponse = response.generate(true, 'No Blog Is Found', 404, null)
            res.send(apiResponse)
        }
        else {
            logger.captureInfo('Blog Is found', 'Blog Controller:getSingleBlog', 8)
            let apiResponse = response.generate(false, 'Blog Is Found Successfully', 200, result)
            res.send(apiResponse)
        }
    })
        .select('-__v -_id')
}
//end getsingle blog




//get single blog using author
let getauthor = (req, res) => {
    BlogModel.findOne({ 'author': req.params.author }, (err, result) => {
        if (err) {
            logger.captureError(`error occured:${err}`, 'Blog Controller:getSingleBlogUsingByAuthor', 8)
            let apiResponse = response.generate(true, 'No Blog Is Found', 500, null)
            res.send(apiResponse)
        }
        else if (check.isEmpty(result)) {
            logger.captureError('No Blog Is Found', 'Blog Controller:getSingleBlogUsingByAuthor', 8)
            let apiResponse = response.generate(true, 'No Blog Is Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.captureInfo('Blog Is found', 'Blog Controller:getSingleBlogUsingByAuthor', 8)
            let apiResponse = response.generate(false, 'Blog Is Found Successfully', 200, result)
            res.send(apiResponse)
        }
    })
        .select('-__v -_id')

}
//get single blog by author is end



//edit blog
let editblog = (req, res) => {
    let options = req.body;
    BlogModel.update({ 'blogId': req.params.blogId }, options, { multi: true }).exec((err, result) => {
        if (err) {
            logger.captureError(`error occured:${err}`, 'Blog Controller:editBlog', 8)
            let apiResponse = res.generate(ture, 'Blog Is Not Edited Successfully', 500, null)
            res.send(apiResponse)
        }
        else if (check.isEmpty(result)) {
            logger.captureError('Blog is Not Editted', 'Blog Controller:Blog Controller:editBlog', 8)
            let apiResponse = response.generate(true, 'No Blog Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.captureInfo('Blog Is Edited Successfully', 'Blog Controller:editBlog', 8)
            let apiResponse = response.generate(false, 'Blog Is Edited Successfully', 200, result)
            res.send(apiResponse)
        }

    })
}
//edit blog is end




//another way of edit the blog
let editbloga = (req, res) => {
    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {
        if (err) {
            res.send(err)
        }
        else if (check.isEmpty(result)) {
            res.send('No Blog found')
        } else {
            result.views += 1;
            result.title = req.body.title;
            result.save(function (err, result) {
                if (err) {
                    logger.captureError(`error occured:${err}`, 'Blog Controller:editBlog', 8)
                    let apiResponse = response.generate(true, 'Blog Is Not Edited Successfully', 500, null)
                    res.send(apiResponse)
                }
                else {
                    logger.captureInfo('Blog Is Edited Successfully', 'Blog Controller:editBlog', 8)
                    let apiResponse = response.generate(false, 'Blog Is Edited Successfully', 200, result)
                    res.send(apiResponse)
                }
            })
        }
    })
        .select('-__v -_id')
}
//another way of edit the blog




//remove blog
let removeblog = (req, res) => {
    BlogModel.remove({ 'blogId': req.params.blogId }, (err, result) => {
        if (err) {
            logger.captureError(`error occured:${err}`, 'Blog Controller:delete Blog', 8)
            let apiResponse = response.generate(true, 'Blog Is Not Deleted', 500, null)
            res.send(apiResponse)
        }
        else if (check.isEmpty(result)) {
            logger.captureError('Blog Is Not Deleted', 'Blog Controller:delete Blog', 8)
            let apiResponse = response.generate(true, 'No Blog Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.captureInfo('Blog Is Deleted Successfully', 'Blog Controller:delete Blog', 8)
            let apiResponse = response.generate(false, 'Blog Is Deleted Successfully', 200, result)
            res.send(apiResponse)
        }
    })
}
//end delete blog

let createModelIfNotExists = (modelName) => {
    let Model;

    try {
        Model = mongoose.model(modelName);
    } catch (error) {
        console.log(error)
        const { name, message, stack, code } = error;
        console.log(name)
        console.log(message)
        console.log(stack)
        console.log(code)
        Model = require('./../models/test')(modelName);
    }

    return Model;
};


let createblog = (req, res) => {
    const modelName = req.body.modelName;


    const userAdress = createModelIfNotExists(modelName);

    var usrAdrs1 = new userAdress({
        city: 'mimisal',
        state: 'tamil nadu'
    });
    usrAdrs1.save((err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
};
//create blog is end



module.exports = {
    createblog: createblog,
    getALLBlogs: getALLBlogs,
    getSingleBlog: getSingleBlog,
    getauthor: getauthor,
    editblog: editblog,
    editbloga: editbloga,
    removeblog: removeblog
}